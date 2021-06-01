import Dexie from 'dexie';

const db = new Dexie('AssetMobileDatabase');
db.version(1).stores({

  masterSurveyDesigns: 'id++, masterSurveyId',
  elementDesigns: 'id, name, masterSurveyId',
  subElementDesigns: 'id++, surveyDesignId, name, elementId, ien, mandatory',
  surveyDesigns: 'id++, surveyDesignId, answer, hasAddAnswerComponent,hasConditionMenuLookupComponent, hasCommentsComponent, hasRiskComponent, hasRenewalComponent, hasResponsibilityComponent,hasUpdatedComponent',



  masterSurveys:'id++, loCode',
  elements: 'id++, loCode, masterSurveyId',
  subElements: 'id++, loCode, master_survey_id, element_id',
  surveys: 'id++, survey_design_id, element_id, loCode, sub_element_id',

  addressInfo: 'address,' +
    'all_level_ren_multiplier,' +
    'archetype_code,' +
    'condition_survey_by,' +
    'condition_survey_date,' +
    'condition_survey_type,' +
    'dwelling,' +
    'in_sample,' +
    'internal_survey,' +
    'lo_cloned_from,' +
    'lo_code,' +
    'lo_reference,' +
    'lo_type,' +
    'lo_type_1_count,' +
    'lo_type_code,' +
    'parent_lo_code,' +
    'possibility_of_asbestos,' +
    'region,' +
    'street_name,' +
    'unit_type,' +
    'unit_type_code'

});



const deleteElement = function* ({payload}) {
  try {
    const id = payload;
    yield db.open();
    yield db.elements.delete(id);
  } finally {
    db.close();
  }
};







export const getAllFromTable = function* (tableName){
  let results = [];
  try {
    yield db.open();
    results = yield db.table(tableName).toArray();
  }finally{
    db.close();
    return results;
  }
};

export const getFromTable = function* (tableName, criteria){
  let result = {};
  try {
    yield db.open();
    result = yield db.table(tableName).get(criteria);
  }finally{
    db.close();
    return result;
  }
};


export const queryTable = function* (tableName, query){
  let results = [];
  try {
    yield db.open();
    results = yield db.table(tableName).where(query).toArray();
  }finally{
    db.close();
    return results
  }
}


export const anyOfQueryTable = function* (tableName, index, value){
  let results = [];
  try {
    yield db.open();
    results = yield db.table(tableName).where(index).anyOf(value).toArray();
  }finally{
    db.close();
    return results
  }
}


export const putInTable = function* (tableName, data) {
  try {
    yield db.open();
    yield db.table(tableName).put(data);
  } finally {
    db.close();
  }
};

export const bulkPutInTable = function* (tableName, data) {
  try {
    yield db.open();
    yield db.table(tableName).bulkPut(data);
  } finally {
    db.close();
  }
};

export const deleteFromTable = function* ({payload}) {
  try {
    const {tableName, id} = payload;
    yield db.open();
    yield db.table(tableName).delete(id);
  } finally {
    db.close();
  }
};

export default db;




