import React, {Component} from 'react';
import GuestList from './GuestList'

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
  // getAttendingGuests = () => ;
  // get UnconfirmedGuests = () => ;

  render() {
    return (<div className="App">
      <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <form>
          <input type="text" value={this.state.pendingGuest} placeholder="Invite Someone" onChange={this.handleNameInput}/>
          <button type="submit" name="submit" value="submit" onClick={this.newGuestSubmitHandler}>Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input type="checkbox" onChange={this.toggleFilter} checked={this.state.isFiltered}/>
            Hide those who haven't responded
          </label>
        </div>
        <table className="counter">
          <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
        <GuestList guests={this.state.guests} toggleConfirmationAt={this.toggleConfirmationAt} toggleIsEditingAt={this.toggleIsEditingAt} setNameAt={this.setNameAt} isFiltered={this.state.isFiltered} removeGuestAt={this.removeGuestAt}/>
      </div>
    </div>);
  }
}

export default App;
