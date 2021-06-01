
const ANSWERS = 'surveys';


function extractAnswers(obj, loCode) {
  const answers = obj[ANSWERS];
  return answers.map(answer=>{
      answer.lo_code = loCode;
      return answer;
  });
}

// function extractMaterials(obj) {
//   const materials = obj[ANSWERS];
// }
//
// function* extractElements(obj) {
//
// }
//
// function* extractMasterSurveys(obj) {
//
// }


export function processConditionSurveysForLoCode(data, loCode) {

  const test = data;

  console.log(data);

  const answers = extractAnswers(test, loCode);
  console.log(answers);

  // const materials = extractMaterials(test);
  // console.log(materials);
  //
  // const elements = yield extractElements(data);
  // console.log(elements);
  //
  // const masterSurveys = yield extractMasterSurveys(data);
  // console.log(masterSurveys);

  return {answers};

};