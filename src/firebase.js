import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAftZelopjfPRrZRXc6zNIeK68LK2aiw9k",
  authDomain: "d-print-calc-fdd82.firebaseapp.com",
  projectId: "d-print-calc-fdd82",
  storageBucket: "d-print-calc-fdd82.firebasestorage.app",
  messagingSenderId: "610943004818",
  appId: "1:610943004818:web:44f7feece65ad580a4764b",
  measurementId: "G-WG9H3FHZEM"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
