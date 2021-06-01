import { all, fork, takeEvery, put, call, getContext } from '@redux-saga/core/effects'
import {
  FETCH_SURVEY_DESIGN,
  FETCH_PROPERTIES,
  LOGIN_REQUEST,
  fireLoginRequestSuccessful,
  LOGIN_REQUEST_SUCCESSFUL,
  fireLoginRequestFailed,
  LOGIN_REQUEST_FAILED,
  STATUS_REQUEST,
  routeLogin,
  routeRoot,
  surveyDesignStored,
  FETCH_SURVEY_DESIGN_SUCCESS,
  fireFetchSurveyDesignSuccess,
  FETCH_PROPERTY_SURVEYS,
  FETCH_PROPERTY_SURVEYS_SUCCESS, fireFetchPropertySurveysSuccess, surveysStored,
  FETCH_DATA_FOR_PROPERTIES, updateJobs, SAVE_AND_UPLOAD_SURVEY
} from '../actions'
import { bulkPutInTable, putInTable } from '../db'


import cheerio from 'cheerio'
import store from '../store'
import {
  CONDITION_RESPONSIBILITY_DESIGN_URI,
  CONDITION_SURVEY_DESIGN_URI,
  CONDITION_SURVEY_UPLOAD_URI,
  LOGIN_URI
} from '../apiUri'
import objectToQuery from '../util/io-query'




export function* postData(url, data){
  const JWTProvider = yield getContext("JWTProvider");
  const jwt = yield call(JWTProvider.get);

  const requestOptions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      ...(jwt && { "x-access-token": jwt }),
      'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
    redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }

  // Default options are marked with *
  const response = yield fetch(url, requestOptions);
  return response.json(); // parses JSON response into native JavaScript objects
}


export function* fetchData(url){
  const JWTProvider = yield getContext("JWTProvider");
  const jwt = yield call(JWTProvider.get);

  const requestOptions = {
    headers: {
      ...(jwt && { "x-access-token": jwt }),
      'Content-Type': 'application/json'
    }
  };

  return yield fetch(url, requestOptions)
    .then(response => {
      return response.text()
    })
    .then(data=> {
      return data;
    })
    .catch(error => console.error(error));
}





function extractMasterSurveysFromHtml(html){
  const $ = cheerio.load(html);

  let masterSurveyOptions = [];

  $('option').each(function (i, e) {
    const masterSurveyId = this.attribs['data-pmm-master-survey-id'];
    const value = this.attribs['value'];
    const text = this.firstChild.data;

    masterSurveyOptions.push({masterSurveyId, value, text});
  })

  return masterSurveyOptions;

}

function extractBuildPhaseFromHtml(html){

  const $ = cheerio.load(html);

  let buildPhaseOptions = [];

  $('option').each(function (i, e) {
    const value = this.attribs['value'];
    const text = this.firstChild.data;

    buildPhaseOptions.push({value, text});
  })

  return {name: 'buildphase_id', options: buildPhaseOptions};

}

function extractConditionMenuFromHtml(html){
  const $ = cheerio.load(html);

  let conditionMenuOptions = [];

  $('.lookupOption').each(function (i, e) {
    const value = this.firstChild.attribs['value'];
    const text = this.lastChild.data;

    conditionMenuOptions.push({value, text});
  })

  return {name: 'condition_id', options: conditionMenuOptions};
}

function extractResponsibilityFromJSON(json){
  const responsibilityObj = JSON.parse(json);

  const options = responsibilityObj.questions.responsibility_id.options.map(item=>{
    return {value:item.id, text: item.description};
  })

  return {name: 'responsibility_id', options};
}




function extractElementsFromHtml(masterSurveyId, html){
  // console.log(html);

  // let element = {name, masterSurveyCode, masterSurveyId, elementId, loCode, status }

  const $ = cheerio.load(html);

  let elements = [];


  $('div').each(function (i, e) {

    const id = this.attribs['data-pmm-pk'];
    const name = this.lastChild.lastChild.data;

    elements.push({masterSurveyId, id, name});
  })


  return elements;
}

function extractSubElementsFromHtml(html){
  // console.log(html);

  // let subElement = {name, subElementId, elementId, loCode, mandatory, status }


  const $ = cheerio.load(html);

  let subElements = [];
  let elementId;


  // todo pass in is_internal_survey
  // if is_internal_survey === 'y' then check if sub element ied === 'E'
  // if so dont save sub element
  // if all sub elements for a given element have been removed, return elementid so we can remove it


  $('nav').each(function (navIndex, nav) {

    const elementHref = $(nav).attr('id');
    elementId = elementHref.split('/')[5];

    $(nav).find('div').each(function(divIndex, div){
      const surveyDesigntHref = $( $(div).find('a')[0] ).attr('href');
      const surveyDesignId = surveyDesigntHref.split('/')[5];
      const ien = $(div).attr('data-pmm-ien');
      const name = $(div).find('span')[0].firstChild.data;
      const mandatory = $( $(div).find('a')[0] ).hasClass('pmm-mandatory');

      subElements.push({elementId, surveyDesignId, ien, mandatory, name});

    });

  })



  return subElements;
}

function extractSurveyDesignsFromHtml(html, responsibilityDesign, buildPhaseDesign, conditionMenuDesign){
  const $ = cheerio.load(html);

  let surveysDesigns = [];

  $('.component').each(function (surveyIndex, survey) {
    const surveyDesignId = $(survey).attr('data-pmm-pk');

    const answer = extractAnswer( $( $(survey).find('.oms-module-survey-answer')[0] ) );

    const fieldset = $(survey).find('fieldset')[0];
    const additionalComponentsStr = $(fieldset).contents().last()[0].data;

    const additionalComponents = additionalComponentsStr.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );

    const hasAddAnswerComponent = $(survey).find($('.oms-module-survey-add')).length > 0;

    const conditionMenu = additionalComponents.includes('${condition-menu-lookup}') ? conditionMenuDesign : null;

    const buildPhase = additionalComponents.includes('${buildphase-menu-lookup}') ? buildPhaseDesign : null;

    const hasCommentsComponent = additionalComponents.includes('${comment}');

    const hasRiskComponent = additionalComponents.includes('${risk}');

    const hasRenewalComponent = additionalComponents.includes('${Renewal}');

    const responsibility = additionalComponents.includes('${responsibility}') ? responsibilityDesign : null;

    const hasUpdatedComponent = additionalComponents.includes('${updated}');

    // in fieldset
    // ${condition-menu-lookup}
    // ${comment}
    // ${Renewal}
    // ${responsibility}
    // ${updated}


    // todo add fire risk assessment component data to survey


    surveysDesigns.push({surveyDesignId,
      answer,
      hasAddAnswerComponent,
      buildPhase,
      conditionMenu,
      hasCommentsComponent,
      hasRiskComponent,
      hasRenewalComponent,
      responsibility,
      hasUpdatedComponent
    });
  });

  return surveysDesigns;

}

function extractAnswer(answerHtml){

  const $ = cheerio.load(answerHtml);

  let select = answerHtml.find('select')[0];
  if(select){
    let options = [];
    const placeholder = select.attribs['placeholder'];
    const name = select.attribs['name'];
    $(select.children).each(function(optionIndex, option){
      const value = option.attribs['value'];
      const text = option.firstChild.data;
      options.push({value, text });
    })
    return {type: 'select', name, options, placeholder};

  }else{

    var lookupOptions = answerHtml.find('.lookupOption');
    if( lookupOptions.length > 0 ){
      let options = [];
      let name = '';
      lookupOptions.each(function(optionIndex, option){
        name = option.firstChild.attribs['name'];
        const value = option.firstChild.attribs['value'];
        const text = option.lastChild.data;
        options.push({value, text });
      });
      return {type: 'radio', name, options};

    }else{
      var input = answerHtml.find('input')[0];
      if(input){
        const placeholder = input.attribs['placeholder'];
        const type = input.attribs['type'];
        const name = input.attribs['name'];
        return {type, name, placeholder};
      }
      else{
        return {type:'none'};
      }
    }

  }

  //
  // name=internal_position_id
  //   .buildphase-menu-lookup = buildphase_id
  //   .position-menu-lookup = internal_position_id
  //   .condition-menu-lookup = condition_id
  // answer_text
  // material_id = mandatory


}

function* extractDesignsFromHtml(html, responsibilityDesign){

  const querying = cheerio.load(html);

  const masterSurveysHtml = querying('[data-pmm-fragment="pmm-master-survey"]', html).html();

  // todo get masterSurveyDesigns and add additional data to masterSurveys below
  const masterSurveys = extractMasterSurveysFromHtml(masterSurveysHtml);


  // buildphase_id
  const buildPhaseHtml = querying('[data-pmm-fragment="buildphase-menu-lookup"]', html).html();
  const buildPhaseDesign = extractBuildPhaseFromHtml(buildPhaseHtml);

  //condition_id
  const conditionMenuHtml = querying('[data-pmm-fragment="condition-menu-lookup"]', html).html();
  const conditionMenuDesign = extractConditionMenuFromHtml(conditionMenuHtml);

  let elements = [];
  let subElements = [];
  let surveys = [];


  querying('[data-pmm-fragment="pmm-survey-design"]', html).each(function(index, obj){

    const masterSurveyId = querying(obj).attr('data-pmm-survey-id');

    const html = querying(obj).html();


    const elementsHtml = querying('[data-pmm-fragment="elementList"]', html).html();

    elements = elements.concat( extractElementsFromHtml(masterSurveyId, elementsHtml) );


    const subElementsHtml = querying('[data-pmm-fragment="subElementList"]', html).html();

    subElements = subElements.concat( extractSubElementsFromHtml(subElementsHtml) );


    const surveysHtml = querying('[data-pmm-fragment="surveys"]', html).html();

    surveys = surveys.concat( extractSurveyDesignsFromHtml(surveysHtml, responsibilityDesign, buildPhaseDesign, conditionMenuDesign) );



  });


    return {masterSurveys, elements, subElements, surveys};

}

export function* fetchSurveyDesign() {
  const JWTProvider = yield getContext("JWTProvider");
  const jwt = yield call(JWTProvider.get);

  const requestOptions = {
    headers: {
      ...(jwt && { "x-access-token": jwt }),
      'Content-Type': 'application/json'
    }
  };

  const fetchedData = yield fetch(CONDITION_SURVEY_DESIGN_URI, requestOptions)
    .then(response => {
      return response.text()
    })
    .then(data=> {
      return data;
    })
    .catch(error => console.error(error));

  yield put(fireFetchSurveyDesignSuccess(fetchedData));

}


export function* fetchResponsibilityDesign() {
  const JWTProvider = yield getContext("JWTProvider");
  const jwt = yield call(JWTProvider.get);

  const requestOptions = {
    headers: {
      ...(jwt && { "x-access-token": jwt }),
      'Content-Type': 'application/json'
    }
  };

  return yield fetch(CONDITION_RESPONSIBILITY_DESIGN_URI, requestOptions)
    .then(response => {
      return response.text()
    })
    .then(data=> {
      return data;
    })
    .catch(error => console.error(error));

}

function* fetchSurveyDesignSuccess({payload}){
  const responsibilityJSON = yield fetchResponsibilityDesign();
  const responsibilityDesign = extractResponsibilityFromJSON(responsibilityJSON);

  const designs = yield extractDesignsFromHtml(payload, responsibilityDesign);

  yield storeSurveyDesigns(designs);
}



function* storeSurveyDesigns(designs){

  const {masterSurveys, elements, subElements, surveys} = designs;

  let tableName = 'masterSurveyDesigns';
  let data = masterSurveys;
  yield call(bulkPutInTable, tableName, data);

  tableName = 'elementDesigns';
  data = elements;
  yield call(bulkPutInTable, tableName, data);

  tableName = 'subElementDesigns';
  data = subElements;
  yield call(bulkPutInTable, tableName, data);

  tableName = 'surveyDesigns';
  data = surveys;
  yield call(bulkPutInTable, tableName, data);

  yield put(surveyDesignStored());
}



export function* fetchProperties(query) {
  const JWTProvider = yield getContext("JWTProvider");
  const jwt = yield call(JWTProvider.get);

  const requestOptions = {
    headers: {
      ...(jwt && { "x-access-token": jwt }),
      'Content-Type': 'application/json'
    }
  };

  const formattedQuery =   query.replace(/ /g, '%25');
  const url = "mob/locations/search?query=address=like=" + "%25" + formattedQuery + "%25";


  fetch(url, requestOptions)
    .then(response => {
      return response.text()
    })
    .then(data=> {



      console.log(data);

    })
    .catch(error => console.error(error));
}


























const consolidateMasterSurveyData = (array) => {
  return array.reduce((objectsByKeyValue, obj) => {
    const { master_survey_id, ...rest } = obj
    objectsByKeyValue[master_survey_id] = (objectsByKeyValue[master_survey_id] || []).concat(rest)
    return objectsByKeyValue
  }, {})
}

const consolidateElementData = (array, loCode, masterSurveyId) => {
  const entries = Object.entries(
    array.reduce((objectsByKeyValue, obj) => {
      const { element_id, ...rest } = obj
      objectsByKeyValue[element_id] = (objectsByKeyValue[element_id] || []).concat(rest)
      return objectsByKeyValue
    }, {})
  )

  let elements = [];
  for (const [elementId] of entries) {
    elements.push({ loCode, masterSurveyId, elementId });
  }
  return elements;
}

const extractSurveyLayouts = (parsedData) => {
  let masterSurveys = [];
  let elements = [];
  let subElements = [];

  Object.entries(parsedData).forEach((entry) => {
    const loCode = parseInt(entry[0], 10);

    const masterElementSubIds = entry[1].master_element_sub_ids;

    subElements = subElements.concat( masterElementSubIds.map(entry=>{
      return {...entry, loCode};
    }) );

    const masterSurveyData = consolidateMasterSurveyData(entry[1].master_element_sub_ids);

    Object.keys(masterSurveyData).forEach( entry => masterSurveys.push( {master_survey_id: entry,  loCode} ) );

    //masterSurveys = masterSurveys.concat( Object.keys(masterSurveyData).map( entry => {return {masterSurveyId: entry, loCode}} ) );

    Object.entries(masterSurveyData).forEach((entry) => {
      elements = elements.concat( consolidateElementData(entry[1], loCode, entry[0]) );
    })

  })


  return {masterSurveys, elements, subElements};


}

const extractSurveys = (parsedData) => {
  let returnArray = [];

  Object.entries(parsedData).forEach((entry) => {

    const loCode = entry[0];

    let surveys = entry[1].surveys;

    returnArray = returnArray.concat(surveys.map((entry) => {
      entry.loCode = loCode;
      return entry;
    }));

  })

  return returnArray;
}

export function* fetchPropertySurveys({payload}){
  var queryObject = {
    'lo_code[]': payload
  }
  var queryString = objectToQuery(queryObject)
  const url = '/mob/v1/condition/data?' + queryString


  const jwt = localStorage.getItem('JWT')

  const requestOptions = {
    headers: {
      ...(jwt && { 'x-access-token': jwt })
    }
  }

  const fetchedData = yield fetch(url, requestOptions)
    .then(response => {
      return response.text()
    })
    .then(data=> {
      return data;
    })
    .catch(error => console.error(error));


  yield put(fireFetchPropertySurveysSuccess(fetchedData));
}

export function* fetchPropertySurveysSuccess({payload}){
  const parsedData = JSON.parse(payload);
  const surveyLayouts = extractSurveyLayouts(parsedData);
  const surveys = extractSurveys(parsedData);

   yield storeMasterSurveys(surveyLayouts.masterSurveys);
   yield storeElements(surveyLayouts.elements);

   yield storeSubElements(surveyLayouts.subElements);

   yield storeSurveys(surveys);
}

function* storeMasterSurveys(masterSurveys){
  let tableName = 'masterSurveys';
  let data = masterSurveys;
  yield call(bulkPutInTable, tableName, data);
}

function* storeElements(elements){
  let tableName = 'elements';
  let data = elements;
  yield call( bulkPutInTable, tableName, data );
}

function* storeSubElements(subElements){
  let tableName = 'subElements';
  let data = subElements;
  yield call( bulkPutInTable, tableName, data );
}

function* storeSurveys(surveys){

  let tableName = 'surveys';
  let data = surveys;

  yield call( bulkPutInTable, tableName, data );

  yield put(surveysStored());
}




function* fetchAddressInfo({payload}){

  const url = '/mob/locations/list?query=lo_code=in=' + '(' + payload.join() + ')';


  const jwt = localStorage.getItem('JWT')

  const requestOptions = {
    headers: {
      ...(jwt && { 'x-access-token': jwt })
    }
  }

  const fetchedData = yield fetch(url, requestOptions)
    .then(response => {
      return response.text()
    })
    .then(data=> {
      return data;
    })
    .catch(error => console.error(error));

  yield fetchAddressInfoSuccess(fetchedData);
}

function* storeAddressInfo(addressInfo){
  let tableName = 'addressInfo';
  let data = addressInfo;
  yield call( bulkPutInTable, tableName, data );
}

export function* fetchAddressInfoSuccess(data){
  const addressInfo = JSON.parse(data);
  yield storeAddressInfo(addressInfo);

  yield  put( updateJobs(addressInfo) );
}


function* fetchDataForProperties(payload){
  yield fetchAddressInfo(payload);

  yield fetchPropertySurveys(payload);
}






export function* watchFetchSurveyDesign() {
  yield takeEvery(FETCH_SURVEY_DESIGN, fetchSurveyDesign)
}

export function* watchFetchSurveyDesignSuccess() {
  yield takeEvery(FETCH_SURVEY_DESIGN_SUCCESS, fetchSurveyDesignSuccess)
}

export function* watchFetchProperties(){
  yield takeEvery(FETCH_PROPERTIES, fetchProperties)
}


// check response status for all responses before processin them

export function* loginRequest({payload}) {


  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  };
  const jsonResponse = yield fetch(LOGIN_URI, requestOptions)
    .then(resp => resp.json())
    .then(data => {
      return data;
    })

  if (jsonResponse.message) {
    yield put(fireLoginRequestFailed(jsonResponse.message));
  } else {
    yield put(fireLoginRequestSuccessful(jsonResponse));
  }
}

export function* loginRequestSuccessful({payload}) {
  const JWTProvider = yield getContext("JWTProvider");
  yield call(JWTProvider.set, payload.token);

  yield put(routeRoot());
}

export function* loginRequestFailed(errorMsg) {
  console.log(errorMsg);
}

export function* watchLoginRequest(){
  yield takeEvery(LOGIN_REQUEST, loginRequest)
}
export function* watchLoginRequestSuccessful(){
  yield takeEvery(LOGIN_REQUEST_SUCCESSFUL, loginRequestSuccessful)
}
export function* watchLoginRequestFailed(){
  yield takeEvery(LOGIN_REQUEST_FAILED, loginRequestFailed)
}




export function* statusRequest() {
  const JWTProvider = yield getContext("JWTProvider");
  const jwt = yield call(JWTProvider.get);

  const requestOptions = {
    headers: {
      ...(jwt && { "x-access-token": jwt }),
    }
  };
  const jsonResponse = yield fetch('/mob/server/status', requestOptions)
    .then(response=>{
      if(response.status === 401){
        store.dispatch(routeLogin());
      }else{
       console.log("worked");
      }
    });

  // if (jsonResponse.message) {
  //   yield put(fireStatusRequestFailed(jsonResponse.message));
  // } else {
  //   yield put(fireStatusRequestSuccessful(jsonResponse));
  // }
}

export function* watchStatusRequest(){
  yield takeEvery(STATUS_REQUEST, statusRequest)
}









export function* watchFetchPropertySurveys() {
  yield takeEvery(FETCH_PROPERTY_SURVEYS, fetchPropertySurveys)
}

export function* watchFetchPropertySurveysSuccess() {
  yield takeEvery(FETCH_PROPERTY_SURVEYS_SUCCESS, fetchPropertySurveysSuccess)
}




export function* watchFetchDataForProperties() {
  yield takeEvery(FETCH_DATA_FOR_PROPERTIES, fetchDataForProperties)
}









export function* saveAndUploadSurvey({payload}){
  let tableName = 'surveys';
  let data = payload;

  yield call(putInTable, tableName, data);

  const response = yield postData(CONDITION_SURVEY_UPLOAD_URI,data);
}

export function* watchSaveAndUploadSurvey(){
  yield takeEvery(SAVE_AND_UPLOAD_SURVEY, saveAndUploadSurvey)
}


export default function* () {
  yield all([
    fork(watchLoginRequest),
    fork(watchLoginRequestSuccessful),
    fork(watchLoginRequestFailed),
    fork(watchFetchSurveyDesign),
    fork(watchFetchSurveyDesignSuccess),
    fork(watchFetchProperties),
    fork(watchStatusRequest),
    fork(watchFetchPropertySurveys),
    fork(watchFetchPropertySurveysSuccess),
    fork(watchFetchDataForProperties),
    fork(watchSaveAndUploadSurvey)
  ])
}