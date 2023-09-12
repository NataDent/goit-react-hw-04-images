import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

import {
  Header,
  SearchFormStyled,
  SearchFormButtonStyled,
  SearchFormInputStyled,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = e => {
    const { value } = e.currentTarget;
    setQuery(value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query === '') {
      toast.info('Please enter your search term');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <Header>
        <SearchFormStyled onSubmit={handleSubmit}>
          <SearchFormInputStyled
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleInput}
          />
          <SearchFormButtonStyled type="submit">
            <FiSearch size="16px" />
            Search
          </SearchFormButtonStyled>
        </SearchFormStyled>
      </Header>
    </>
  );
};

Searchbar.propTypes = {
  // query: PropTypes.string,
  // onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
