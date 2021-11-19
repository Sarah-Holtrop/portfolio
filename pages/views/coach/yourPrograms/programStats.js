import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
const ProgramStats = ({ exercise }) => {
  return (
    <Row>
      <Col xs={6}>{exercise.exerciseName}</Col>
      <Col xs={3}>{exercise.sets} sets</Col>
      <Col xs={3}>{exercise.reps} reps</Col>
      <Col xs={3}>
        {/* <Button>Edit</Button> */}
      </Col>

    </Row>
  )

}
export default ProgramStats;