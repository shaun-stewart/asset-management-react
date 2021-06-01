import React, {useState} from 'react'
import { Form, Button } from '@orchard/react-components'
import { useDispatch } from 'react-redux'
import {fireLoginRequest} from '../../actions'


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <Form>
        <Form.Input
          data-cy="login-username"
          label="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          data-cy="login-password"
          label="Password"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button data-cy="login-confirm" primary onClick={()=>dispatch( fireLoginRequest({username, password}) ) } >Login</Button>
      </Form>
    </div>

  )
}

export default Login

