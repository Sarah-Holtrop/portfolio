import { React, useEffect } from 'react';
import { useAsync } from 'react-use';
import YourWorkout from './yourWorkout';
import axios from 'axios';
import state from './state';
const Teammate = () => {
  useEffect(async () => {
    await state.getUser();
  }, []);

  let { loading, value: workout = {} } = useAsync(async () => {
    let result = await axios.get('/api/teammate/getProgram');
    return result.data[0];
  });

  if (loading) {
    return <div>Loading your workout</div>
  }
  let content;
  if (!workout.programId) {
    content = <div>You haven't been invited to a program yet</div>
  } else {
    content = <YourWorkout workout={workout} />
  }
  return (
    <div>
      <h1>Hey, {state.user.username}!</h1>
      {content}
    </div>
  )
}
export default Teammate;