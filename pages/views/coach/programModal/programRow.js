import FormControl from "react-bootstrap/Form";
import { useState } from 'react';
import NumberDropdown from "../../../../components/numberDropdown";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ProgramRow = ({ setRow, index }) => {
  let defaultPlan = {
    exerciseName: '',
    sets: '',
    reps: ''
  }
  let [plan, setPlan] = useState(defaultPlan);
  function set(name, value) {
    let p = { ...plan };
    p[name] = value;
    setPlan(p)
    if (p.exerciseName && p.sets && p.reps) {
      setRow(p, index)
    }
  }
  return (
    <Row>
      {/* <FormControl type="text" placeholder="Search Users" /> */}
      {/* maybe change to typeahead ^^ */}
      <Col xs={12} className='d-flex d-inline justify-content-center mt-3'>
        <Form.Control
          onChange={(e) => set(e.target.name, e.target.value)}
          placeholder='Exercise Name'
          name='exerciseName'
        />
        <Form.Control
          placeholder='Sets'
          type='number'
          onChange={(e) => set(e.target.name, e.target.value)}
          name="sets" />
        <Form.Control
          placeholder='Reps'
          type='number'
          onChange={(e) => set(e.target.name, e.target.value)}
          name="reps" />
      </Col>
    </Row>
  )
}
export default ProgramRow;