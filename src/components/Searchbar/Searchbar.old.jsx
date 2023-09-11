import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

import {
  Header,
  SearchFormStyled,
  SearchFormButtonStyled,
  SearchFormInputStyled,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    if (query === '') {
      toast.info('Please enter your search term');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Header>
          <SearchFormStyled onSubmit={this.handleSubmit}>
            <SearchFormInputStyled
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query}
              onChange={this.handleInput}
            />
            <SearchFormButtonStyled type="submit">
              <FiSearch size="16px" />
            </SearchFormButtonStyled>
          </SearchFormStyled>
        </Header>
      </>
    );
  }
}

Searchbar.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
