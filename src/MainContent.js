import React from 'react';
import PropTypes from 'prop-types';
import ConfirmedFilter from './ConfirmedFilter';
import Counter from './Counter';
const MainContent = props => {
  return (<div className="main">
    <div>
      <h2>Invitees</h2>
      <ConfirmedFilter toggleFilter={props.toggleFilter} isFiltered={props.isFiltered}/>
    </div>
    <Counter totalInvited={props.totalInvited} numberAttending={props.numberAttending} numberUnconfirmed={props.numberUnconfirmed}/>
  </div>);
};

MainContent.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool,
  numberAttending: PropTypes.number,
  numberUnconfirmed: PropTypes.number,
  totalInvited: PropTypes.number
}

export default MainContent;
