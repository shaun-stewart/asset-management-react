import React from 'react'
import { Form } from '@orchard/react-components'


const Renewal = (props) => {
  const {last_renewed_year, next_renewed_year, renewal_quantity} = props.defaultValues;
  return <Form.Group>
    <Form.Field>
      <label>Last Renewal</label>
      <input placeholder='First Name' defaultValue={last_renewed_year}/>
    </Form.Field>

    <Form.Field>
      <label>Next Renewal</label>
      <input placeholder='First Name' defaultValue={next_renewed_year}/>
    </Form.Field>

    <Form.Field>
      <label>Quantity</label>
      <input placeholder='First Name' defaultValue={renewal_quantity}/>
    </Form.Field>
  </Form.Group>
}

export default Renewal




