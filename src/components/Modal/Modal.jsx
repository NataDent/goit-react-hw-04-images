import { ModalStyled, ModalOverlayStyled, LargeImage } from './Modal.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal  =() => {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

   const componentWillUnmount = ()  => {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

 const  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

   const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlayStyled onClick={handleBackdropClick}>
        <ModalStyled>
          <LargeImage src={children} alt="qwwqwe" />
        </ModalStyled>
      </ModalOverlayStyled>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};
