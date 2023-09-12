import { ModalStyled, ModalOverlayStyled, LargeImage } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlayStyled onClick={handleBackdropClick}>
      <ModalStyled>
        <LargeImage src={src} alt="qwwqwe" />
      </ModalStyled>
    </ModalOverlayStyled>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};
