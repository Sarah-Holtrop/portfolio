import format from 'date-fns/format';

const DetailsRow = ({ details }) => {
  return (
    <tr>
      <td className='p-3'> <strong>{details.username}</strong></td>
      <td className='p-3'>{details.exerciseName}</td>
      <td className='p-3'>{details.sets} x {details.reps}</td>
      <td className='p-3'>{details.weight}</td>
      <td className='p-3'>{format(new Date(details.date), 'MM-dd-yyyy')}</td>
    </tr >
  )
}
export default DetailsRow;