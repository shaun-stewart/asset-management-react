import React, {useEffect} from 'react'
import Page from '../Page'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadSubElements,
  routeSurvey,
  updateCurrentSurveyDesignId
} from '../../actions'
import { Grid } from '@orchard/react-components'
import { history } from '../../store'


const SubElements = () => {
  const dispatch = useDispatch();

  // todo persist current survey module (state is cleared on a refresh so this data wont be available)
  const subElements = useSelector(state => state.currentSurveyModule.subElements);

  useEffect(() => { dispatch( loadSubElements() ) }, []);


  const onSubElementClick = (surveyDesignId)=>{
    dispatch(updateCurrentSurveyDesignId(surveyDesignId))
    dispatch(routeSurvey())
  }

  const subElementComponents = subElements.map((subElement,index) => {
    return (
      <Grid.Column key={subElement.name+index}>
        <button onClick={()=>{onSubElementClick(subElement.surveyDesignId)} }>{'go to ' + subElement.name + ' ' + subElement.surveyDesignId }</button>
      </Grid.Column>
    );
  });

  const content = <div>
    <Grid columns='three' divided>
      {subElementComponents}
    </Grid>
  </div>;

  return (
    <Page title={'Sub Elements'} content={content} onBackClick={history.goBack}/>
  )
}

export default SubElements;

