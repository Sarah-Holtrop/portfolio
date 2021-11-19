import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const BasicModal = ({ show, title, children, close, onSubmit, error }) => {
  // title to replace: 'Create a new Program'
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {error && (
          <span className='text-danger'>Error</span>
        )}
        <Button onClick={onSubmit} variant='primary'>Finish</Button>
        {/* TODO createProgram endpoint + hookup */}
        <Button onClick={close} variant='outline-secondary'>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default BasicModal;