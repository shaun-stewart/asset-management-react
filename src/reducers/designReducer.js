import {
  SURVEY_DESIGN_STORED
} from '../actions';


const initialState = {
  surveyDesignStored: false
};

const designReducer =  (state = initialState, { type, payload }) => {
  if(type === SURVEY_DESIGN_STORED){
    return {...state, surveyDesignStored: true};
  }
  return state;
}

export default designReducer;
