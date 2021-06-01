import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import loginReducer from './loginReducer';
import elementsReducer from './elementsReducer';
import designReducer from './designReducer';
import jobsReducer from './jobsReducer'
import currentSurveyModuleReducer from './currentSurveyModule'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user: loginReducer,
  design: designReducer,
  elements: elementsReducer,
  jobs: jobsReducer,
  currentSurveyModule: currentSurveyModuleReducer
})
export default createRootReducer


