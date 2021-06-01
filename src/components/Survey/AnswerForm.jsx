import React, { useState } from 'react'
import { Form } from '@orchard/react-components'
import Renewal from './Renewal'


const AnswerForm = props => {

  const { index, data, design, answerUpdateHandler } = props
  const {
    answer,
    hasCommentsComponent,
    hasAddAnswerComponent,
    conditionMenu,
    hasRenewalComponent,
    responsibility,
    buildPhase,
    hasUpdatedComponent
  } = design

  const [materialId, setMaterialId] = useState(data.material_id && data.material_id.toString())
  const [conditionId, setConditionId] = useState(data.condition_id && data.condition_id.toString())
  const [buildPhaseId, setBuildPhaseId] = useState(data.buildphase_id && data.buildphase_id.toString())
  const [responsibilityId, setResponsibilityId] = useState(data.responsibility_id && data.responsibility_id.toString())
  const [comments, setComments] = useState(data.comments || '');
  const [renewals, setRenewals] = useState(data.renewals || {})


  const createMaterialComponent = answer => {
    const handleChange = (e, { value }) => {
      setMaterialId( value );
      answerUpdateHandler(index, {material_id: value});
    }


    switch (answer.type) {
      case'select':
        return <Form.Select label="Answer"
                            placeholder={answer.placeholder}
                            fluid
                            selection
                            options={answer.options}
                            defaultValue={materialId}
                            onChange={handleChange}/>
      case 'radio':
        const options = answer.options.map(option => {
          return (
            <Form.Field key={option.value}>
              <Form.Radio
                label={option.text}
                value={option.value}
                checked={materialId === option.value}
                onChange={handleChange}
              />
            </Form.Field>
          )
        })
        return (<div><Form.Field>
          Answer
        </Form.Field>
          <Form.Group widths='equal'>
            {options}
          </Form.Group></div>)
      case 'date':
      case 'number':
        return <Form.Field type={answer.type} onChange={handleChange}/>
      case 'none':
      default:
        return ''
    }


  }

  const createConditionMenuComponent = conditionMenu => {
    if (conditionMenu) {
      const handleChange = (e, { value }) => {
        setConditionId( value );
        answerUpdateHandler(index, {condition_id: value});
      }

      const options = conditionMenu.options.map(option => {
        return (
          <Form.Field key={option.value}>
            <Form.Radio
              label={option.text}
              value={option.value}
              checked={conditionId === option.value}
              onChange={handleChange}
            />
          </Form.Field>
        )
      })
      return (<div><Form.Field>
        <label> Condition</label>
      </Form.Field>
        <Form.Group widths='equal'>
          {options}
        </Form.Group></div>)
    } else {
      return ''
    }
  }

  const createBuildPhaseComponent = buildPhase => {
    if (buildPhase) {
      const handleChange = (e, { value }) => {
        setBuildPhaseId( value );
        answerUpdateHandler(index, {buildphase_id: value});
      }

      const options = buildPhase.options.map(option => {
        return (
          <Form.Field>
            <Form.Radio
              label={option.text}
              value={option.value}
              checked={buildPhaseId === option.value}
              onChange={handleChange}
            />
          </Form.Field>
        )
      })
      return (<div><Form.Field>
        Build Phase
      </Form.Field>
        <Form.Group widths='equal'>
          {options}
        </Form.Group></div>)
    } else {
      return ''
    }
  }

  const createResponsibilityComponent = responsibility => {
    if (responsibility) {
      const handleChange = (e, { value }) => {
        setResponsibilityId( value );
        answerUpdateHandler(index, {responsibility_id: value});
      }

      return <Form.Select label="Responsibility"
                          fluid
                          selection
                          options={responsibility.options}
                          defaultValue={responsibilityId}
                          onChange={handleChange}/>
    } else {
      return ''
    }
  }

  const createCommentsComponent = () => {
    // todo delay the onchange trigger
    const handleChange = (e, { value }) => {
      setComments( value );
      answerUpdateHandler(index, {comments: value});
    }
    return (
      <div>
        <Form.Field>
          <label> Comments</label>
        </Form.Field>
        <Form.TextArea defaultValue={comments} onChange={handleChange}/>
      </div>

    );
  }


  const materialComponent = createMaterialComponent(answer)

  const conditionMenuComponent = createConditionMenuComponent(conditionMenu)

  const buildPhaseComponent = createBuildPhaseComponent(buildPhase)

  const responsibilityComponent = createResponsibilityComponent(responsibility)

  const commentsComponent = createCommentsComponent()



  return (
    <Form key={"answer form " + index}>
      {materialComponent}

      {buildPhaseComponent}

      {conditionMenuComponent}

      {hasCommentsComponent && commentsComponent}

      {hasRenewalComponent && <Renewal defaultValues={data.renewals}/>}

      {responsibilityComponent}

      {hasUpdatedComponent &&
      <Form.Group>
        <Form.Field>
          <label>Updated By</label>
          <input readOnly value={data.updated_by}/>
        </Form.Field>

        <Form.Field>
          <label>Updated At</label>
          <input readOnly value={data.updated_at}/>
        </Form.Field>
      </Form.Group>
      }

    </Form>
  )
}

export default AnswerForm

// Field: typeof FormField
// Button: typeof FormButton
// Checkbox: typeof FormCheckbox
// Dropdown: typeof FormDropdown
// Group: typeof FormGroup
// Input: typeof FormInput
// Radio: typeof FormRadio
// Select: typeof FormSelect
// TextArea: typeof FormTextArea


