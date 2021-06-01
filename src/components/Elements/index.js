import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from "prop-types";
import Page from '../Page'
import Element from './Element'
import { Grid } from "@orchard/react-components";
import {
  loadElements,
  routeSubElements,
  updateCurrentElementId
} from '../../actions'
import { history } from '../../store'


const Elements = () => {
  const dispatch = useDispatch();

  const elements = useSelector(state => state.currentSurveyModule.elements);

  useEffect(() => { dispatch( loadElements() ) }, []);


  const onElementClick = (elementId)=>{
    dispatch(updateCurrentElementId(elementId))
    dispatch(routeSubElements())
  }

  const elementComponents = elements.map((element,index) => {
    return (
      <Grid.Column key={element.name+index}>
        <Element name={element.name} onClick={()=>{ onElementClick(element.id) } } />
      </Grid.Column>
    );
  });
  
  const content = <div>
    <Grid columns='three' divided>
      {elementComponents}
    </Grid>
  </div>;
  
  return (
    <Page title={'Elements'} content={content} onBackClick={history.goBack}/>
  )
};

Elements.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    elementId: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.number,
    lo_code: PropTypes.number
  }))
};

export default Elements

