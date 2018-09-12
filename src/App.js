import React, {Component} from 'react';
import GuestList from './GuestList';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false
      }, {
        name: 'Nic',
        isConfirmed: true,
        isEditing: false
      }, {
        name: 'Matt K',
        isConfirmed: false,
        isEditing: true
      }
    ]
  };

  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        } else {
          return guest;
        }
      })
    });
  };

  toggleConfirmationAt = indexToChange => this.toggleGuestPropertyAt("isConfirmed", indexToChange);

  toggleIsEditingAt = indexToChange => this.toggleGuestPropertyAt("isEditing", indexToChange);

  setNameAt = (name, indexToChange) => this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return {
          ...guest,
          name
        }
      } else {
        return guest;
      }
    })
  });

  handleNameInput = e => this.setState({pendingGuest: e.target.value});

  newGuestSubmitHandler = e => {
    e.preventDefault();
    if (this.state.pendingGuest !== "") {
      this.setState({
        guests: [
          {
            name: this.state.pendingGuest,
            isConfirmed: false,
            isEditing: false
          },
          ...this.state.guests
        ],
        pendingGuest: ""
      });
    }
  };

  removeGuestAt = index => {
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    });
  };

  toggleFilter = () => this.setState({
    isFiltered: !this.state.isFiltered
  });

  getTotalInvited = () => this.state.guests.length;
  getAttendingGuests = () => this.state.guests.reduce(
    (total, guest) => guest.isConfirmed
    ? total + 1
    : total,
  0);

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (<div className="App">
      <Header pendingGuest={this.state.pendingGuest} handleNameInput={this.handleNameInput} newGuestSubmitHandler={this.newGuestSubmitHandler}/>
      <MainContent toggleFilter={this.toggleFilter} isFiltered={this.isFiltered} totalInvited={totalInvited} numberAttending={numberAttending} numberUnconfirmed={numberUnconfirmed}/>
      <GuestList guests={this.state.guests} toggleConfirmationAt={this.toggleConfirmationAt} toggleIsEditingAt={this.toggleIsEditingAt} setNameAt={this.setNameAt} isFiltered={this.state.isFiltered} removeGuestAt={this.removeGuestAt} pendingGuest={this.state.pendingGuest}/>
    </div>);
  }
}

export default App;
