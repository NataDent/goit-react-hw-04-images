import { ModalStyled, ModalOverlayStyled, LargeImage } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlayStyled onClick={handleBackdropClick}>
      <ModalStyled>
        <LargeImage src={largeImageUrl} alt="qweqwe" />
      </ModalStyled>
    </ModalOverlayStyled>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
