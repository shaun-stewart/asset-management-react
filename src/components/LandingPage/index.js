import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Page from '../Page'
import { fetchSurveyDesign, routeJobList } from '../../actions'


const LandingPage = () => {
  const dispatch = useDispatch();

  const design = useSelector(state => state.design);

  design.surveyDesignStored ? dispatch(routeJobList()) : dispatch(fetchSurveyDesign());

  return (
    <Page title={'Landing Page'}/>
  )
}

export default LandingPage

