import Exercise from './exercise';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const yourWorkout = ({ workout }) => {
  let programId = workout.programId;
  // need to pass an array of params: [{programId, planId, weight}, {programId, planId, weight}]
  let [progress, setProgress] = useState({})
  async function submitWorkout() {
    let res = await axios.post('/api/teammate/addProgress', Object.values(progress));
  }
  function setWeight(key, weight, planId) {
    let p = { ...progress };
    p[key] = { planId, weight, programId };
    setProgress(p)
  }

  let exercises = JSON.parse(workout.workoutPlan).map((e) => <Exercise exercise={e} onChange={setWeight} />)
  let count = 1;
  return (
    <div>
      <h4>{workout.name} {count} / {workout.weeklyCount}</h4>
      {exercises}
      <Button variant='success' onClick={submitWorkout}>Submit</Button>
    </div>
  )
}
export default yourWorkout;