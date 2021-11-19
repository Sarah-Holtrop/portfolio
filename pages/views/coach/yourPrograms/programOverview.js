import ProgramStats from "./programStats";
import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useAsync } from "react-use";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import format from 'date-fns/format';

const ProgramOverview = ({ program }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const { loading, value: options = [] } = useAsync(async () => {
    let result = await axios.get('/api/teammate/search', { params: { search } })
    return result.data;
  }, [search]);
  let stats = JSON.parse(program.workoutPlan).map((e, i) => <ProgramStats key={e.exerciseName} exercise={e} />)
  let startDate = format(new Date(program.startDate), 'MM-dd-yyyy');
  let endDate = format(new Date(program.endDate), 'MM-dd-yyyy');

  async function select(selected) {
    let username = selected[0].username;
    let res = await axios.post('api/teammate/assign', { programId: program.programId, username });
    if (res.status === 200) {
      let sent = await axios.get('api/email/sendEmail', { params: { teammate: username, programName: program.name } });
    }
  }

  return (
    <div>
      <h4>{program.name}</h4>
      <h5 className='muted'>{startDate} to {endDate} with {program.weeklyCount} workouts per week <Button onClick={() => setShowSearch(!showSearch)}>Add Teammates</Button></h5>
      {stats}
      {showSearch && (
        <AsyncTypeahead
          id='teammate-search'
          isLoading={loading}
          options={options}
          onSearch={setSearch}
          onChange={select}
          labelKey="username"
        />
      )}
    </div>
  )
}
export default ProgramOverview;