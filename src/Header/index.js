import React from 'react';
import PropTypes from 'prop-types';
import GuestInputForm from './GuestInputForm';

const Header = props => {
  return (<header>
    <h1>RSVP</h1>
    <p>Keep Track of your Invitees</p>
    <GuestInputForm pendingGuest={props.pendingGuest} handleNameInput={props.handleNameInput} newGuestSubmitHandler={props.newGuestSubmitHandler}/>
  </header>);

}

Header.propTypes = {
  pendingGuest: PropTypes.string.isRequired,
  handleNameInput: PropTypes.func.isRequired,
  newGuestSubmitHandler: PropTypes.func.isRequired
}

export default Header;
