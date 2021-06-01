import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'

import Login from './components/Login'
import JobList from './components/JobList'
import PropertySearch from './components/PropertySearch'
import MasterSurveys from './components/MasterSurveys'
import Elements from './components/Elements'
import SubElements from './components/SubElements'
import Survey from './components/Survey'
import Photos from './components/Photos'
import 'sanitize.css/sanitize.css'
import './index.css'
import { Route, Redirect } from 'react-router'

import LandingPage from './components/LandingPage'















const target = document.querySelector('#root')



const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          const isAuthenticated = localStorage.getItem('JWT');
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
        }
      />
    );
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Route exact path="/Login" component={Login} />
        <ProtectedRoute exact path="/" component=  {LandingPage} />
        <ProtectedRoute exact path="/JobList" component={JobList} />
        <ProtectedRoute exact path="/PropertySearch" component={PropertySearch} />
        <ProtectedRoute exact path="/MasterSurveys" component={MasterSurveys} />
        <ProtectedRoute exact path="/Elements" component={Elements} />
        <ProtectedRoute exact path="/SubElements" component={SubElements} />
        <ProtectedRoute exact path="/Survey" component={Survey} />
        <ProtectedRoute exact path="/Photos" component={Photos} />
    </ConnectedRouter>
  </Provider>,
  target
)
