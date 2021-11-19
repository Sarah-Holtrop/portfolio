import Dropdown from 'react-bootstrap/Dropdown';

const SelectionDropdown = ({ selection, title, onChange, value }) => {
  let options = selection.map((o) => <Dropdown.Item
    key={o}
    name={title.toLowerCase()}
    value={o}
    onClick={onChange}
    active={value === o.toLowerCase()}
  >
    {o}
  </Dropdown.Item>);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="selection-dropdown">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options}
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default SelectionDropdown;