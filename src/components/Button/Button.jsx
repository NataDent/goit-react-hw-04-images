import PropTypes from 'prop-types';

import { ButtonStyled, BtnBox } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <BtnBox>
      <ButtonStyled onClick={onClick}>
        <span>Load more</span>
      </ButtonStyled>
    </BtnBox>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
