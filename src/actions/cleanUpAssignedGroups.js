import FBInstance from '../firebaseInstance'
import _ from 'lodash'

const getPath = (accountID, userID, groupID) =>
  (`accounts/${accountID}/users/${userID}/assignedGroups/${groupID}`)

const getGroupsOfAccount = (accountID) => {
  return FBInstance.database().ref('accounts').child(accountID+'/groups').once('value')
    .then(snap => _.values(snap.val()).map(group => group.ID) )
}

const getUsersOfAccount = (accountID) => {
  return FBInstance.database().ref('accounts').child(accountID+'/users').once('value')
    .then(snap => _.values(snap.val()))
}

export const cleanUpAssignedGroupsOfUsers = (accountID) => (
  getGroupsOfAccount(accountID).then(groups =>
    getUsersOfAccount(accountID).then(users => {
      let updates = {}
      users.forEach(user => {
        _.keys(user.assignedGroups).forEach(groupID => {
          if(!groups.includes(groupID)) console.log(getPath(accountID, user.ID, groupID))
          if(!groups.includes(groupID)) updates[getPath(accountID, user.ID, groupID)] = null
        })
      })
      return FBInstance.database().ref().update(updates)
    })
  )
)
