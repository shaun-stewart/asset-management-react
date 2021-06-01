import React, {useEffect} from 'react'
import Page from '../Page'
import { useSelector, useDispatch } from 'react-redux'
import { goToElements, loadMasterSurveys, routeElements, updateCurrentMasterSurveyId } from '../../actions'
import { history } from '../../store'



const MasterSurveys = () => {

  const masterSurveys = useSelector(state => state.currentSurveyModule.masterSurveys);


  const dispatch = useDispatch();


  useEffect(() => {dispatch(loadMasterSurveys())}, []);


  const goToElements = (masterSurveyId)=>{
    dispatch(updateCurrentMasterSurveyId(masterSurveyId))
    dispatch(routeElements());
  }


  const content = masterSurveys.map((masterSurvey) => {
    return (
      <button key={masterSurvey.masterSurveyId} onClick={ ()=> goToElements(masterSurvey.masterSurveyId)}>{'go to ' + masterSurvey.text}</button>
    );
  });


return (
  <Page title={'Master Surveys'} content={content} onBackClick={history.goBack}/>
)
}

export default MasterSurveys

