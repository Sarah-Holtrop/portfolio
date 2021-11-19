import { useState } from 'react';
import { Modal, Tabs, Tab, Button } from 'react-bootstrap';
import Home from './home';
import Program from './program';
import axios from 'axios';
import state from '../state';
import { observer } from 'mobx-react-lite';

const ProgramModal = ({ show, close }) => {
  let newProgram = {
    name: '',
    startDate: '',
    endDate: '',
    weeklyCount: '',
    workoutPlans: [],
  };
  let [program, setProgram] = useState(newProgram)

  function setProperty(key, value) {
    let p = { ...program }
    p[key] = value;
    setProgram(p);
  }

  async function save() {
    await axios.post('/api/coach/createProgram', { program });
    state.getPrograms()
    close();
  }

  return (
    <Modal show={show} onHide={close}>
      <Modal.Title>Create a new Program</Modal.Title>
      <Modal.Body>
        <Tabs defaultActiveKey="home">
          <Tab eventKey="home" title="Home">
            <Home setProperty={setProperty} />
          </Tab>
          <Tab eventKey="program" title="Program">
            <Program setProperty={setProperty} />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={save} variant='primary'>Finish</Button>
        <Button onClick={close} variant='outline-secondary'>Cancel</Button>

      </Modal.Footer>
    </Modal>
  )
}
export default observer(ProgramModal);