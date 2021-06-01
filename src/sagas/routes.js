import { spawn, takeEvery, all, fork, put } from 'redux-saga/effects'
import {
  ROUTE_ROOT,
  ROUTE_LOGIN,
  ROUTE_LANDING_PAGE,
  ROUTE_JOB_LIST,
  ROUTE_PROPERTY_SEARCH,
  ROUTE_MASTER_SURVEYS,
  ROUTE_ELEMENTS, ROUTE_SUB_ELEMENTS, ROUTE_SURVEY
} from '../actions'
import { push } from "connected-react-router"

function* loadRoot(){
  yield put(push("/"));
}

function* loadLogin() {
  yield put(push("/Login"));
}

function* loadLandingPage() {
  yield put(push("/LandingPage"));
}

function* loadJobList() {
  yield put(push("/JobList"));
}

function* loadPropertySearch() {
  yield put(push("/PropertySearch"));
}

function* loadMasterSurveys() {
  yield put(push("/MasterSurveys"));
}

function* loadElements() {
  yield put(push("/Elements"));
}

function* loadSubElements() {
  yield put(push("/SubElements"));
}

function* loadSurvey() {
  yield put(push("/Survey"));
}


// Routes that require side effects on load are mapped here.
const routesMap = {
  [ROUTE_ROOT]: loadRoot,
  [ROUTE_LOGIN]: loadLogin,
  [ROUTE_LANDING_PAGE]: loadLandingPage,
  [ROUTE_JOB_LIST]: loadJobList,
  [ROUTE_PROPERTY_SEARCH]: loadPropertySearch,
  [ROUTE_MASTER_SURVEYS]: loadMasterSurveys,
  [ROUTE_ELEMENTS]: loadElements,
  [ROUTE_SUB_ELEMENTS]: loadSubElements,
  [ROUTE_SURVEY]: loadSurvey
}

// Spawn the saga associated with the route type.
function * handleRouteChange ({type}) {
  yield spawn(routesMap[type])
}

// Watch for all actions dispatched that have an action type in
// our routesMap.
function * watchRoutes () {
  yield takeEvery(Object.keys(routesMap), handleRouteChange)
}

export default function*() {
  yield all([
    fork(watchRoutes)
  ])
}