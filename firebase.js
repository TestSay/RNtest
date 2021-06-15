import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAWCga2bTPQNF5joxSz4GT-OZmMurOROSA",
  authDomain: "rn-test-2ba8d.firebaseapp.com",
  projectId: "rn-test-2ba8d",
  storageBucket: "rn-test-2ba8d.appspot.com",
  messagingSenderId: "109068314071",
  appId: "1:109068314071:web:8d4c0a08e7ec41553f5792",
  measurementId: "G-J94JWNW5FL"
};

let app;

if(firebase.apps.length === 0){
  app = firebase.initialzeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export {db,auth}

