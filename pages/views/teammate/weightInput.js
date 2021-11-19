import { Form } from "react-bootstrap";

const WeightInput = ({ sets, planId, onChange }) => {
  return (
    [...Array(sets)]
      .map((e, i) => <Form.Control
        key={`${sets}-${i}`}
        className="mx-3"
        type={'number'}
        name={`${planId}-${i}`}
        onChange={(e) => onChange(e.target.name, e.target.value, planId)}
      />)
  )
}
export default WeightInput;