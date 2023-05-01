import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

const Modal = ({ children, onClose }) => {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate('..');
  };

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open={true} className={classes.modal}>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
