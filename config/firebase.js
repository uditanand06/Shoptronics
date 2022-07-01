// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDtgescquyJi8PYFf8vjOMdmAyHUrgvHCI",
  authDomain: "auth-development-74c52.firebaseapp.com",
  projectId: "auth-development-74c52",
  storageBucket: "auth-development-74c52.appspot.com",
  messagingSenderId: "589493902213",
  appId: "1:589493902213:web:54358fbc29f9ac2d6702ec",
  measurementId: "G-C6BC8NLVD1"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()