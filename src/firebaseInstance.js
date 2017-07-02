import firebase from 'firebase';

let config

const prodDB = window.location.pathname.includes('prod')

if (prodDB) {
	console.log('prod_DB')
	config = {
		apiKey: "AIzaSyDvrSSswvlUmB2hhrgQwA3407_KUPqcYXY",
    authDomain: "apotower-ed9eb.firebaseapp.com",
    databaseURL: "https://apotower-ed9eb.firebaseio.com",
    projectId: "apotower-ed9eb",
    storageBucket: "apotower-ed9eb.appspot.com",
    messagingSenderId: "1070970987025"
	}
} else {

	console.log("dev_DB")
	config = {
		apiKey: "AIzaSyCg4wdcZLYjOv9giDzGyE1wwwrdwSf1G28",
		authDomain: "apotowerdev.firebaseapp.com",
		databaseURL: "https://apotowerdev.firebaseio.com",
		projectId: "apotowerdev",
		storageBucket: "apotowerdev.appspot.com",
		messagingSenderId: "359455830469"
	}
}

const firebaseInstance = firebase.initializeApp(config)

export const firebaseAuth = firebase.auth
export const Storage = firebaseInstance.storage()

export default firebaseInstance;
