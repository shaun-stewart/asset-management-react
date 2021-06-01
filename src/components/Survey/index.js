import React, {useEffect, useState} from 'react'
import Page from '../Page'
import AnswerForm from './AnswerForm'
import { history } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { loadSurvey, saveAndUploadSurvey } from '../../actions'



const Survey = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch( loadSurvey() ) }, []);

  const survey = useSelector(state => state.currentSurveyModule.survey);

  let answers = [...survey.answers];

  const answerUpdateHandler = (index, updatedAttribute) => {
    const newAnswers = [...answers];
    newAnswers[index] = {...newAnswers[index], ...updatedAttribute};

    answers = newAnswers;
  }

  const answerComponents = answers.map((answer, i) => {
    return <AnswerForm key={i} index={i} data={answer} design={survey.answerDesign} answerUpdateHandler={answerUpdateHandler}/>;
  });


  const saveOnClickHandler = () => {
    // only trigger on after update
    answers.forEach((answer)=>{
      dispatch( saveAndUploadSurvey(answer) )
    });

  }

  const content = <div>
   {answerComponents}

   <button onClick={saveOnClickHandler}>Save</button>
  </div>;

  return (
    <Page title={'Material'} content={content} onBackClick={history.goBack}/>
  )
}

export default Survey

