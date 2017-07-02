import React, { Component } from 'react';
import { firebaseAuth } from '../firebaseInstance'
import { getAllAccountIDs, getUsersOfAccount } from '../actions'
import { cleanUpAssignedGroupsOfUsers } from '../actions/cleanUpAssignedGroups'
import _ from 'lodash'
import './App.css';

class App extends Component {
  constructor(p){
    super(p)

    firebaseAuth().signInWithEmailAndPassword('admin@apotower.de', 'allgood2')
      .then(() => this.startPulling())
      .catch(e => console.log(e))
  }

  startPulling = () => {
    getAllAccountIDs()
      .then(accountIDs => {
        const accountPromises = []
        accountIDs.forEach(id => accountPromises.push(cleanUpAssignedGroupsOfUsers(id)))
        Promise.all(accountPromises).then(resArray => console.log(resArray))
      })
  }



  render() {
    return (
      <div className="App">
        Doing some DB inspection.
      </div>
    )
  }
}

export default App;
