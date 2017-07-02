import FBInstance from '../firebaseInstance'
import _ from 'lodash'

const getUsersOfAccount = (accountID) => {
  return FBInstance.database().ref('accounts').child(accountID+'/users').once('value')
    .then(snap => _.values(snap.val()))
}

export const getAssignedGroupsOfUsers = (accountID) => (
  getUsersOfAccount(accountID).then(users =>
    users.map(user => {
      console.log(user.name)
      console.log(user.assignedGroups)
      return user.assignedGroups
    })
  )
)
