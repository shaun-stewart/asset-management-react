import {
  UPDATE_JOBS
} from '../actions';


const initialState = {
  jobs: []
};

const jobsReducer =  (state = initialState, { type, payload }) => {
  if(type === UPDATE_JOBS){
    return {...state,  jobs: payload};
  }
  return state;
}

export default jobsReducer;
