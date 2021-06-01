import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects'
import { LOAD_JOBS, updateJobs } from '../actions'
import { getAllFromTable } from '../db'


function* loadJobs(){
  const tableName = 'addressInfo';
  const jobs = yield call(getAllFromTable, tableName);
  yield put(updateJobs(jobs));
}



export function* watchLoadJobs() {
  yield takeEvery(LOAD_JOBS, loadJobs)
}




export default function*() {
  yield all([
    fork(watchLoadJobs)
  ])
}