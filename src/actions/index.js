import {createAction} from 'redux-actions'

// DB ACTIONS
// export const PUT_IN_TABLE = 'PUT_IN_TABLE';
// export const putInTable = createAction(PUT_IN_TABLE);
//
// export const BULK_PUT_IN_TABLE = 'BULK_PUT_IN_TABLE';
// export const bulkPutInTable = createAction(BULK_PUT_IN_TABLE);
//
// export const DELETE_FROM_TABLE = 'DELETE_FROM_TABLE';
// export const deleteFromTable = createAction(DELETE_FROM_TABLE);
//
// export const QUERY_TABLE = 'QUERY_TABLE';
// export const queryTable = createAction(QUERY_TABLE);












// ROUTING ACTIONS
export const ROUTE_ROOT = 'ROUTE_ROOT';
export const routeRoot = createAction(ROUTE_ROOT);

export const ROUTE_LOGIN = 'ROUTE_LOGIN';
export const routeLogin = createAction(ROUTE_LOGIN);

export const ROUTE_LANDING_PAGE = 'ROUTE_LANDING_PAGE';
export const routeLandingPage = createAction(ROUTE_LANDING_PAGE);

export const ROUTE_JOB_LIST = 'ROUTE_JOB_LIST';
export const routeJobList = createAction(ROUTE_JOB_LIST)

export const ROUTE_PROPERTY_SEARCH = 'ROUTE_PROPERTY_SEARCH';
export const routePropertySearch = createAction(ROUTE_PROPERTY_SEARCH);

export const ROUTE_MASTER_SURVEYS = 'ROUTE_MASTER_SURVEYS';
export const routeMasterSurveys = createAction(ROUTE_MASTER_SURVEYS);

export const ROUTE_ELEMENTS = 'ROUTE_ELEMENTS';
export const routeElements = createAction(ROUTE_ELEMENTS);

export const ROUTE_SUB_ELEMENTS = 'ROUTE_SUB_ELEMENTS';
export const routeSubElements = createAction(ROUTE_SUB_ELEMENTS);

export const ROUTE_SURVEY = 'ROUTE_SURVEY';
export const routeSurvey = createAction(ROUTE_SURVEY);




// NAVIGATIONS ACTIONS
export const GO_TO_MASTER_SURVEYS = 'GO_TO_MASTER_SURVEYS';
export const goToMasterSurveys = createAction(GO_TO_MASTER_SURVEYS)

export const GO_TO_ELEMENTS = 'GO_TO_ELEMENTS';
export const goToElements = createAction(GO_TO_ELEMENTS);

export const GO_TO_SUB_ELEMENTS = 'GO_TO_SUB_ELEMENTS';
export const gotToSubElements = createAction(GO_TO_SUB_ELEMENTS);

export const GO_TO_SURVEY = 'GO_TO_SURVEY';
export const gotToSurvey = createAction(GO_TO_SURVEY);



// SERVER ACTIONS
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const fireLoginRequest = createAction(LOGIN_REQUEST);

export const LOGIN_REQUEST_SUCCESSFUL = 'LOGIN_REQUEST_SUCCESSFUL';
export const fireLoginRequestSuccessful = createAction(LOGIN_REQUEST_SUCCESSFUL);

export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const fireLoginRequestFailed = createAction(LOGIN_REQUEST_FAILED);





export const STATUS_REQUEST = 'STATUS_REQUEST';
export const fireStatusRequest = createAction(STATUS_REQUEST);








export const FETCH_SURVEY_DESIGN = 'FETCH_SURVEY_DESIGN';
export const fetchSurveyDesign = createAction(FETCH_SURVEY_DESIGN);

export const FETCH_SURVEY_DESIGN_SUCCESS = 'FETCH_SURVEY_DESIGN_SUCCESS';
export const fireFetchSurveyDesignSuccess = createAction(FETCH_SURVEY_DESIGN_SUCCESS);

export const FETCH_SURVEY_DESIGN_FAILURE = 'FETCH_SURVEY_DESIGN_FAILURE';
export const fetchSurveyDesignFailure = createAction(FETCH_SURVEY_DESIGN_FAILURE);

export const SURVEY_DESIGN_STORED = 'SURVEY_DESIGN_STORED';
export const surveyDesignStored = createAction(SURVEY_DESIGN_STORED);



export const FETCH_PROPERTIES = 'FETCH_PROPERTIES';
export const fetchProperties = createAction(FETCH_PROPERTIES);

export const PROPERTIES_RECEIVED = 'PROPERTIES_RECEIVED';
export const propertiesReceived = createAction(PROPERTIES_RECEIVED);

export const ERROR_FETCHING_PROPERTIES = 'ERROR_FETCHING_PROPERTIES';



export const FETCH_PROPERTY_SURVEYS = 'FETCH_PROPERTY_SURVEYS';
export const fireFetchPropertySurveys = createAction(FETCH_PROPERTY_SURVEYS);

export const FETCH_PROPERTY_SURVEYS_SUCCESS = 'FETCH_PROPERTY_SURVEYS_SUCCESS';
export const fireFetchPropertySurveysSuccess = createAction(FETCH_PROPERTY_SURVEYS_SUCCESS);

export const SURVEYS_STORED = 'SURVEYS_STORED';
export const surveysStored = createAction(SURVEYS_STORED);

export const SURVEY_LAYOUTS_STORED = 'SURVEY_LAYOUTS_STORED';
export const surveyLayoutsStored = createAction(SURVEY_LAYOUTS_STORED);




export const FETCH_ADDRESS_INFO = 'FETCH_ADDRESS_INFO';
export const fireFetchAddressInfo = createAction(FETCH_ADDRESS_INFO);

export const FETCH_DATA_FOR_PROPERTIES = 'FETCH_DATA_FOR_PROPERTIES';
export const fireFetchDataForProperties = createAction(FETCH_DATA_FOR_PROPERTIES);

export const FETCH_DATA_FOR_PROPERTIES_SUCCESS = 'FETCH_DATA_FOR_PROPERTIES_SUCCESS';
export const fireFetchDataForPropertiesSuccess = createAction(FETCH_DATA_FOR_PROPERTIES_SUCCESS);



export const LOAD_JOBS = 'LOAD_JOBS';
export const loadJobs = createAction(LOAD_JOBS);

export const UPDATE_JOBS = 'UPDATE_JOBS';
export const updateJobs = createAction(UPDATE_JOBS);






export const SAVE_AND_UPLOAD_SURVEY = 'SAVE_AND_UPLOAD_SURVEY';
export const saveAndUploadSurvey = createAction(SAVE_AND_UPLOAD_SURVEY);








// CURRENT SURVEY MODULE

export const LOAD_MASTER_SURVEYS = 'LOAD_MASTER_SURVEYS';
export const loadMasterSurveys = createAction(LOAD_MASTER_SURVEYS);

export const LOAD_ELEMENTS = 'LOAD_ELEMENTS';
export const loadElements = createAction(LOAD_ELEMENTS);

export const LOAD_SUB_ELEMENTS = 'LOAD_SUB_ELEMENTS';
export const loadSubElements = createAction(LOAD_SUB_ELEMENTS);

export const LOAD_SURVEY = 'LOAD_SURVEY';
export const loadSurvey = createAction(LOAD_SURVEY);



export const UPDATE_CURRENT_LO_CODE = 'UPDATE_CURRENT_LO_CODE';
export const updateCurrentLoCode = createAction(UPDATE_CURRENT_LO_CODE);

export const UPDATE_CURRENT_MASTER_SURVEY_ID = 'UPDATE_CURRENT_MASTER_SURVEY_ID';
export const updateCurrentMasterSurveyId = createAction(UPDATE_CURRENT_MASTER_SURVEY_ID);

export const UPDATE_CURRENT_ELEMENT_ID = 'UPDATE_CURRENT_ELEMENT_ID';
export const updateCurrentElementId = createAction(UPDATE_CURRENT_ELEMENT_ID);

export const UPDATE_CURRENT_SURVEY_DESIGN_ID = 'UPDATE_CURRENT_SURVEY_DESIGN_ID';
export const updateCurrentSurveyDesignId = createAction(UPDATE_CURRENT_SURVEY_DESIGN_ID);




export const UPDATE_CURRENT_MASTER_SURVEYS = 'UPDATE_CURRENT_MASTER_SURVEYS';
export const updateCurrentMasterSurveys = createAction(UPDATE_CURRENT_MASTER_SURVEYS);

export const UPDATE_CURRENT_ELEMENTS = 'UPDATE_CURRENT_ELEMENTS';
export const updateCurrentElements = createAction(UPDATE_CURRENT_ELEMENTS);

export const UPDATE_CURRENT_SUB_ELEMENTS = 'UPDATE_CURRENT_SUB_ELEMENTS';
export const updateCurrentSubElements = createAction(UPDATE_CURRENT_SUB_ELEMENTS);

export const UPDATE_CURRENT_SURVEY = 'UPDATE_CURRENT_SURVEY';
export const updateCurrentSurvey = createAction(UPDATE_CURRENT_SURVEY);

















