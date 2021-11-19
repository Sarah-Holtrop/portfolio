import ProgramOverview from './programOverview';
import state from '../state';
import { useAsync } from 'react-use';

const YourPrograms = () => {
  let { loading, value: programs } = useAsync(() => {
    return state.getPrograms();
  })
  if (loading) {
    return <div>Loading Your Programs...</div>;
  }
  let programList = programs.map((program) => <ProgramOverview program={program} />)

  return (
    <div>
      <h2>Your Active Programs</h2>
      {programList}
    </div>
  )
}
export default YourPrograms;