import { useAsync } from 'react-use';
import state from '../state';
import { useState } from 'react';
import ProgramDetails from './programDetails';

const TeammateProgress = () => {
  let [showProgram, setShowProgram] = useState(null)
  let programList = state.programs.map((p) => <li><a href='#' onClick={() => setShowProgram(p.programId)}>{p.name}</a></li>);
  return (
    <>
      <div>
        <h5 onClick={() => setShowProgram(null)}><a>Your Active Programs</a></h5>
        <ul>{programList}</ul>
      </div>
      <ProgramDetails programId={showProgram} />
    </>
  )

}
export default TeammateProgress;