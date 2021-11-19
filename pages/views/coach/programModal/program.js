import { useState } from 'react';
import ProgramRow from "./programRow";
import Button from 'react-bootstrap/Button'

const Program = ({ setProperty }) => {
  let [count, setCount] = useState(1);
  let [workoutPlans, setWorkoutPlans] = useState([]);
  let programRows = [...Array(count).keys()].map((c, i) => <ProgramRow index={i} setRow={setRow} />)

  function setRow(plan, index) {
    let wp = [...workoutPlans];
    wp[index] = plan;
    setWorkoutPlans([...wp])
    setProperty('workoutPlans', wp)

  }
  return (
    <div>
      {programRows}
      <Button className="mt-3" onClick={() => setCount(count + 1)}>Add</Button>
    </div>
  )
}
export default Program;