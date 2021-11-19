import Dropdown from 'react-bootstrap/Dropdown';

const NumberDropdown = ({ max = 10, title, onChange }) => {
  function getOptions(max) {
    let current = 1;
    let options = [];
    while (current <= max) {
      options.push(current);
      current++;
    }
    return options.map((o) => <Dropdown.Item
      key={o}
      name={title.toLowerCase()}
      value={o}
      onClick={(e) => onChange(title.toLowerCase(), o)}> {o}</Dropdown.Item >);
  }

  let options = getOptions(max);
  return (
    <Dropdown>
      <Dropdown.Toggle style={{ width: '8rem' }} className='mx-3' variant="outline-secondary" id="number-dropdown">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options}
      </Dropdown.Menu>
    </Dropdown>
  )

}
export default NumberDropdown;