import { firebaseAuth } from '../firebaseInstance'
import FBInstance from '../firebaseInstance'
import _ from 'lodash'

export const getAllAccountIDs = () => {
  return FBInstance.database().ref('accountEmails').once('value').then(snap => _.values(snap.val()))
}
