import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CreateAccount from './createAccount';
const LoginForm = () => {

  let params = {
    email: '',
    password: ''
  };
  async function login() {
    if (!params.email || !params.password) {
      return;
    }
    let res = await axios.post('/api/user/login', params);
  }
  return (
    <div>
      <h1>Weightroom</h1>
      <Form>
        <h4 className={'mb-3'}>Email</h4>
        <Form.Control onChange={(e) => params.email = e.target.value} />
        <br />
        <h4 className={'mb-3'}>Password</h4>
        <Form.Control
          type="password"
          onChange={(e) => params.password = e.target.value} />
        <Button onClick={login} variant='primary'>Login</Button>
        <CreateAccount />
      </Form>
    </div>
  )
}
export default LoginForm;