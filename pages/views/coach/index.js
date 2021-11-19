import { React, useState, useEffect } from 'react';
import { useAsync } from 'react-use';
import Button from 'react-bootstrap/Button';
import ProgramModal from './programModal';
import YourPrograms from './yourPrograms';
import TeammateProgress from './teammateProgress';
import state from './state';
import { observer } from 'mobx-react-lite';
const Coach = () => {
  useEffect(async () => {
    await state.getUser();
  }, []);

  if (state.user === {}) {
    return null;
  }
  const [showModal, setShowModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  return (
    <div>
      <h1>Hey, Coach {state?.user.firstName}!</h1>
      <Button onClick={() => setShowModal(!showModal)}>Start a new program</Button>
      <Button onClick={() => setShowProgress(!showProgress)} variant='outline-secondary'>View Progress</Button>
      {showModal && (
        <ProgramModal show={showModal} close={() => setShowModal(false)} />
      )}
      {showProgress && (
        <TeammateProgress />
      )}
      <YourPrograms />
    </div>
  )
}
export default observer(Coach);