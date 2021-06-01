import {
  UPDATE_CURRENT_ELEMENT_ID,
  UPDATE_CURRENT_ELEMENTS,
  UPDATE_CURRENT_LO_CODE, UPDATE_CURRENT_MASTER_SURVEY_ID,
  UPDATE_CURRENT_MASTER_SURVEYS,
  UPDATE_CURRENT_SUB_ELEMENTS,
  UPDATE_CURRENT_SURVEY, UPDATE_CURRENT_SURVEY_DESIGN_ID
} from '../actions'


const initialState = {
  loCode: null,
  masterSurveyId: null,
  elementId: null,
  surveyDesignId: null,
  masterSurveys: [],
  elements: [],
  subElements: [],
  survey: {answers:[], answerDesign:{}}
};

const currentSurveyModuleReducer =  (state = initialState, { type, payload }) => {

  switch (type) {
    case UPDATE_CURRENT_LO_CODE:
      return {...state, loCode: payload};
    case UPDATE_CURRENT_MASTER_SURVEY_ID:
      return {...state, masterSurveyId: payload};
    case UPDATE_CURRENT_ELEMENT_ID:
      return {...state, elementId: payload};
    case UPDATE_CURRENT_SURVEY_DESIGN_ID:
      return {...state, surveyDesignId: payload};
    case UPDATE_CURRENT_MASTER_SURVEYS:
      return { ...state, masterSurveys: payload };
    case UPDATE_CURRENT_ELEMENTS:
      return {...state, elements: payload};
    case UPDATE_CURRENT_SUB_ELEMENTS:
      return {...state, subElements: payload};
    case UPDATE_CURRENT_SURVEY:
      return {...state, survey: payload};
    default:
      return state;
  }
}

export default currentSurveyModuleReducer;
