import FBInstance from '../firebaseInstance'
import _ from 'lodash'

const getGroupsOfAccount = (accountID) => {
  return FBInstance.database().ref('accounts').child(accountID+'/groups').once('value')
    .then(snap => _.values(snap.val()).map(group => group.ID) )
}

const getUsersOfAccount = (accountID) => {
  return FBInstance.database().ref('accounts').child(accountID+'/users').once('value')
    .then(snap => _.values(snap.val()))
}

export const cleanUpAssignedGroupsOfUsers = (accountID) => {
  getGroupsOfAccount(accountID).then(groups =>
    getUsersOfAccount(accountID).then(users => {
      console.log(groups)
      const updates = []
      users.forEach(user => {
        _.keys(user.assignedGroups).forEach(groupID => {
          if(!groups.includes(groupID)) console.log(groupID)
        })
      })
    })
  )
}
