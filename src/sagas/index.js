import { all, fork } from 'redux-saga/effects'
import routes from "./routes";
import serverInteraction from './serverInteraction'
import currentSurveyModule from './currentSurveyModule'
import jobs from './jobs'




export default function* () {
  yield all([
    fork(routes),
    fork(serverInteraction),
    fork(currentSurveyModule),
    fork(jobs)
  ]);
}