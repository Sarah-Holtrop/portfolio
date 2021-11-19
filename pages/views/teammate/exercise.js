import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import WeightInput from './weightInput';
import axios from 'axios';

const Exercise = ({ exercise, onChange }) => {
  return (
    <Row className="my-5">
      <Col xs={4}>
        <h5>{exercise.exerciseName} <small>({exercise.reps} reps)</small></h5>
      </Col>
      <Col xs={8} className="d-flex d-inline">
        <WeightInput sets={exercise.sets} planId={exercise.planId} onChange={onChange} />
      </Col>
    </Row>
  )
}
export default Exercise;