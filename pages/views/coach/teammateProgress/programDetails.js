import axios from "axios";
import { useAsync } from 'react-use';
import DetailsRow from './detailsRow';

const ProgramDetails = ({ programId }) => {
  let { loading, value: details = [] } = useAsync(async () => {
    if (programId === null) {
      return [];
    }
    let res = await axios.get('/api/coach/getTeammateProgress', { params: { programId } });
    return format(res.data);
  }, [programId]);

  function format(data) {
    let rows = [];
    for (let row of data) {
      rows.push({ username: row.username, id: row.id, exerciseName: row.exerciseName, sets: row.sets, reps: row.reps, weight: row.weight, date: row.addedDate })
    }
    return rows.sort((a, b) => a.id - b.id)
  }

  if (loading) {
    return <div>Loading...</div>
  }
  if (!details.length) {
    return null;
  }

  let rows = details.map((d) => <DetailsRow details={d} />)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='p-3'>Teammate</th>
            <th className='p-3'>Exercise</th>
            <th className='p-3'>Sets x Reps</th>
            <th className='p-3'>Weight</th>
            <th className='p-3'>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}
export default ProgramDetails;