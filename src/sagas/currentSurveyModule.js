import { call, all, fork, put, takeEvery, getContext } from '@redux-saga/core/effects'
import {
  LOAD_ELEMENTS,
  LOAD_MASTER_SURVEYS,
  LOAD_SUB_ELEMENTS,
  LOAD_SURVEY,
  UPDATE_CURRENT_ELEMENT_ID, UPDATE_CURRENT_LO_CODE,
  UPDATE_CURRENT_MASTER_SURVEY_ID,
  UPDATE_CURRENT_SURVEY_DESIGN_ID,
  updateCurrentElements,
  updateCurrentMasterSurveys,
  updateCurrentSubElements,
  updateCurrentSurvey
} from '../actions'
import { anyOfQueryTable, getFromTable, queryTable } from '../db'


function* loadMasterSurveys(){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  const loCode = parseInt(yield call(CurrentSurveyProvider.getLoCode),10);

  let tableName = 'masterSurveys';
  let query = {loCode};
  let masterSurveys = yield call(queryTable, tableName, query );


  tableName = 'masterSurveyDesigns';
  let index = 'masterSurveyId';
  // todo filer unique master_Survey_ids
  let values = masterSurveys.map(item => item.master_survey_id);
  let masterSurveyDesigns = yield call(anyOfQueryTable, tableName, index, values );

  yield put( updateCurrentMasterSurveys(masterSurveyDesigns) );
}

function* loadElements(){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  const loCode = parseInt(yield call(CurrentSurveyProvider.getLoCode),10);
  const masterSurveyId = yield call(CurrentSurveyProvider.getMasterSurveyId);

  if(loCode && masterSurveyId){
    let tableName = 'elements';
    let query = {loCode, masterSurveyId};
    let elements = yield call(queryTable, tableName, query );

    tableName = 'elementDesigns';
    let index = 'id';
    let values = elements.map(item => item.elementId);
    let elementDesigns = yield call(anyOfQueryTable, tableName, index, values );

    yield put( updateCurrentElements(elementDesigns) );
  }

}

function* loadSubElements(){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  const elementId = yield call(CurrentSurveyProvider.getElementId);

  let tableName = 'subElementDesigns';
  let query = {elementId};
  let subElementDesigns = yield call(queryTable, tableName, query );

  yield put( updateCurrentSubElements(subElementDesigns) );
}

function* loadSurvey(){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  const surveyDesignId = yield call(CurrentSurveyProvider.getSurveyDesignId);

  let tableName = 'surveys';
  let query = {survey_design_id:parseInt(surveyDesignId,10)};
  let answers = yield call(queryTable, tableName, query );

  tableName = 'surveyDesigns';
  let criteria = {surveyDesignId:surveyDesignId};
  let answerDesign = yield call(getFromTable, tableName, criteria );

  // todo check designs exist and throw error if not

  yield put( updateCurrentSurvey({answers,answerDesign}) );
}



function* updateCurrentLoCode({payload}){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  yield call(CurrentSurveyProvider.setLoCode, payload);
}

function* updateCurrentMasterSurveyId({payload}){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  yield call(CurrentSurveyProvider.setMasterSurveyId, payload);
}

function* updateCurrentElementId({payload}){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  yield call(CurrentSurveyProvider.setElementId, payload);
}

function* updateCurrentSurveyDesignId({payload}){
  const CurrentSurveyProvider = yield getContext("CurrentSurveyProvider");
  yield call(CurrentSurveyProvider.setSurveyDesignId, payload);
}



export function* watchLoadMasterSurveys() {
  yield takeEvery(LOAD_MASTER_SURVEYS, loadMasterSurveys)
}

export function* watchLoadElements() {
  yield takeEvery(LOAD_ELEMENTS, loadElements)
}

export function* watchLoadSubElements() {
  yield takeEvery(LOAD_SUB_ELEMENTS, loadSubElements)
}

export function* watchLoadSurvey() {
  yield takeEvery(LOAD_SURVEY, loadSurvey)
}




export function* watchUpdateCurrentLoCode() {
  yield takeEvery(UPDATE_CURRENT_LO_CODE, updateCurrentLoCode)
}

export function* watchUpdateCurrentMasterSurveyId() {
  yield takeEvery(UPDATE_CURRENT_MASTER_SURVEY_ID, updateCurrentMasterSurveyId)
}

export function* watchUpdateCurrentElementId() {
  yield takeEvery(UPDATE_CURRENT_ELEMENT_ID, updateCurrentElementId)
}

export function* watchUpdateCurrentSurveyDesignId() {
  yield takeEvery(UPDATE_CURRENT_SURVEY_DESIGN_ID, updateCurrentSurveyDesignId)
}



export default function*() {
  yield all([
    fork(watchLoadMasterSurveys),
    fork(watchLoadElements),
    fork(watchLoadSubElements),
    fork(watchLoadSurvey),
    fork(watchUpdateCurrentLoCode),
    fork(watchUpdateCurrentMasterSurveyId),
    fork(watchUpdateCurrentElementId),
    fork(watchUpdateCurrentSurveyDesignId)
  ])
}