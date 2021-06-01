import {
  LOGIN_REQUEST_SUCCESSFUL
} from '../actions';


const initialState = {
  username: null,
  permissions: {},
  licenses: []
};

const loginReducer =  (state = initialState, { type, payload }) => {
    if(type === LOGIN_REQUEST_SUCCESSFUL){
      const data = payload.data;
      return {...state, ...data};
    }
    return state;
}

export default loginReducer;
