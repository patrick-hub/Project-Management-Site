import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCORf1Ao7cZZuN-PJbw_y7WkTuXMiM0Lak",
	authDomain: "project-management-app-ccdd2.firebaseapp.com",
	projectId: "project-management-app-ccdd2",
	storageBucket: "project-management-app-ccdd2.appspot.com",
	messagingSenderId: "798108854354",
	appId: "1:798108854354:web:f6967de9a9f4521f44978b",
};

// initialise firebase
firebase.initializeApp(firebaseConfig);

//   initialise individual services
const projectFireStore = firebase.firestore();

const projectAuth = firebase.auth();

const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { projectFireStore, projectStorage, projectAuth, timestamp };
