import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import * as History from 'history'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { apply } from "redux-saga/effects";

export const history = History.createBrowserHistory();

const JWTProvider = {
  *get() {
    return yield apply(localStorage, localStorage.getItem, ["JWT"]);
  },
  *set(payload) {
    yield apply(localStorage, localStorage.setItem, ["JWT", payload]);
  },
  *remove() {
    yield apply(localStorage, localStorage.removeItem, ["JWT"]);
  }
};

const CurrentSurveyProvider = {
  *getLoCode() {
    return yield apply(localStorage, localStorage.getItem, ["LoCode"]);
  },
  *setLoCode(payload) {
    yield apply(localStorage, localStorage.setItem, ["LoCode", payload]);
  },
  *removeLoCode() {
    yield apply(localStorage, localStorage.removeItem, ["LoCode"]);
  },
  *getMasterSurveyId() {
    return yield apply(localStorage, localStorage.getItem, ["MasterSurveyId"]);
  },
  *setMasterSurveyId(payload) {
    yield apply(localStorage, localStorage.setItem, ["MasterSurveyId", payload]);
  },
  *removeMasterSurveyId() {
    yield apply(localStorage, localStorage.removeItem, ["MasterSurveyId"]);
  },
  *getElementId() {
    return yield apply(localStorage, localStorage.getItem, ["ElementId"]);
  },
  *setElementId(payload) {
    yield apply(localStorage, localStorage.setItem, ["ElementId", payload]);
  },
  *removeElementId() {
    yield apply(localStorage, localStorage.removeItem, ["ElementId"]);
  },
  *getSurveyDesignId() {
    return yield apply(localStorage, localStorage.getItem, ["SurveyDesignId"]);
  },
  *setSurveyDesignId(payload) {
    yield apply(localStorage, localStorage.setItem, ["SurveyDesignId", payload]);
  },
  *removeSurveyDesignId() {
    yield apply(localStorage, localStorage.removeItem, ["SurveyDesignId"]);
  }
};

const InitialDataLoadStateProvider = {
  *get() {
    return yield apply(localStorage, localStorage.getItem, ["InitialDataLoaded"]);
  },
  *set(payload) {
    yield apply(localStorage, localStorage.setItem, ["InitialDataLoaded", payload]);
  },
  *remove() {
    yield apply(localStorage, localStorage.removeItem, ["InitialDataLoaded"]);
  }
};

export const sagaMiddleware = createSagaMiddleware({
  context: {
    JWTProvider,
    CurrentSurveyProvider
  }
});


// create the store
const initialState = {
}

const enhancers = []
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const middleware = [sagaMiddleware, routerMiddleware(history)]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers
)

sagaMiddleware.run(rootSaga);

export default store;