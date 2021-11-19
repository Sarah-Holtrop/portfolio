import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'

const Home = ({ setProperty }) => {
  return (
    <Row>
      <Col xs={12}>
        <h5>Program Name</h5>
        <Form.Control onChange={(e) => setProperty(e.target.name, e.target.value)} name='name' type="text" />
        <Col xs={12}>
          <h5>Workouts Per Week</h5>
          <Form.Control name="weeklyCount" onChange={(e) => setProperty(e.target.name, e.target.value)} type="number" />
        </Col>
      </Col>
      <Col xs={12}>
        <h5>Start Date</h5>
        <Form.Control name="startDate" onChange={(e) => setProperty(e.target.name, e.target.value)} type="text" placeholder="YYYY-MM-DD" />
      </Col>
      <Col xs={12}>
        <h5>End Date</h5>
        <Form.Control name="endDate" onChange={(e) => setProperty(e.target.name, e.target.value)} type="text" placeholder="YYYY-MM-DD" />
      </Col>
    </Row>
  )
}
export default Home;