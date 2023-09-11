import { ModalStyled, ModalOverlayStyled, LargeImage } from './Modal.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlayStyled onClick={this.handleBackdropClick}>
        <ModalStyled>
          <LargeImage src={this.props.children} alt="qwwqwe" />
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
