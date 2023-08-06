// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDcRrFolUa1FzmNKGm46wsOk9VPHcIysI',
  authDomain: 'todo-2a588.firebaseapp.com',
  projectId: 'todo-2a588',
  storageBucket: 'todo-2a588.appspot.com',
  messagingSenderId: '159716669424',
  appId: '1:159716669424:web:a1c4c14840b0a26c390f35',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export { auth, db }
