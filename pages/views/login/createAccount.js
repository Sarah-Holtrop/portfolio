import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import BasicModal from '../../../components/basicModal';
import SelectionDropdown from '../../../components/selectionDropdown';
import { useState } from 'react';
import axios from 'axios';

let defaultNewAccount = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  verifyPassword: ''
}

const CreateAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState(defaultNewAccount);
  const [error, setError] = useState(false);

  function setFields(e) {
    newAccount[e.target.name] = e.target.value;
    setNewAccount(newAccount);
  }

  async function createAccount() {
    try {
      if (!Object.values(newAccount).every((v) => v !== '')) {
        throw new Error('All fields must be filled out');
      }
      let res = await axios.post('/api/user/register', newAccount);
      if (res.status === 201) {
        setError(false);
        setShowModal(false);
      }
    } catch (e) {
      setError(true)
    }
  }
  return (
    <>
      <Button onClick={() => setShowModal(true)} variant='success'>Create an account</Button>
      {showModal && (
        <BasicModal
          show={showModal}
          title={'Create An Account'}
          close={() => setShowModal(false)}
          onSubmit={createAccount}
          error={error}
        >
          <Form className='row'>
            <Col xs={12} className='d-flex d-inline'>
              <h5 className={'mb-3'}>Role</h5>
              <Form.Check
                onChange={(e) => setFields(e)}
                type='radio'
                name='role'
                value='coach'
                label='Coach'
                className='mx-5'
              />
              <Form.Check
                onChange={(e) => setFields(e)}
                type='radio'
                name='role'
                value='teammate'
                label='Teamamte'
              />
              {/* <SelectionDropdown
                onChange={setFields}
                selection={roles}
                name='role'
                title={'Role'}
                value={newAccount.role} /> */}
            </Col>
            <Col xs={6}>
              <h5 className={'mb-3'}>First Name</h5>
              <Form.Control
                onChange={(e) => setFields(e)}
                name='firstName' />
            </Col>
            <Col>
              <h5 className={'mb-3'}>Last Name</h5>
              <Form.Control
                onChange={(e) => setFields(e)}
                name='lastName'
              />
            </Col>
            <Col xs={6}>
              <h5 className={'mb-3'}>Email</h5>
              <Form.Control
                onChange={(e) => setFields(e)}
                name='email'
              />
            </Col>
            <Col xs={6}>
              <h5 className={'mb-3'}>Username</h5>
              <Form.Control
                onChange={(e) => setFields(e)}
                name='username'
              />
            </Col>
            <Col xs={6}>
              <h5 className={'mb-3'}>Password</h5>
              <Form.Control type='password'
                onChange={(e) => setFields(e)}
                name='password'
              />
            </Col>
            <Col xs={6}>
              <h5 className={'mb-3'}>Verify Password</h5>
              <Form.Control type='password'
                onChange={(e) => setFields(e)}
                name='verifyPassword'
              />
            </Col>
          </Form>
        </BasicModal>
      )}
    </>
  )
}
export default CreateAccount;