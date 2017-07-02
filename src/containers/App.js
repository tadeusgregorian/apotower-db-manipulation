import React, { Component } from 'react';
import { firebaseAuth } from '../firebaseInstance'
import { getAllAccountIDs } from '../actions'
import { cleanUpAssignedGroupsOfUsers } from '../actions/cleanUpAssignedGroups'
import { getAssignedGroupsOfUsers } from '../actions/getAssignedGroups'
import './App.css';

export default class App extends Component {
  constructor(p){
    super(p)

    firebaseAuth().signInWithEmailAndPassword('admin@apotower.de', 'allgood2')
  }

  cleanUpGroups = () => {
    getAllAccountIDs()
      .then(accountIDs => {
        const accountPromises = []
        accountIDs.forEach(id => accountPromises.push(cleanUpAssignedGroupsOfUsers(id)))
        Promise.all(accountPromises).then(resArray => console.log(resArray))
      })
  }

  logAssignedGroups = () => {
    getAllAccountIDs()
      .then(accountIDs => {
        const accountPromises = []
        accountIDs.forEach(id => accountPromises.push(getAssignedGroupsOfUsers(id)))
        Promise.all(accountPromises).then(resArray => {
          resArray.forEach(groups => groups.forEach(group => console.log(group)))
        })
      })
  }


  render() {
    return (
      <div className="App">
        <btn onClick={this.cleanUpGroups}> Delete Excess Groups </btn>
        <btn onClick={this.logAssignedGroups}> Log assignedGroups </btn>
      </div>
    )
  }
}
