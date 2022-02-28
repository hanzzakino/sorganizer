// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDSjlw4nWM9ba8er-25uGJosaSYiNfd0I",
  authDomain: "sorganizer-28d9f.firebaseapp.com",
  projectId: "sorganizer-28d9f",
  storageBucket: "sorganizer-28d9f.appspot.com",
  messagingSenderId: "1003164818974",
  appId: "1:1003164818974:web:3abb127b102a4d9072d80f"
};

// Initialize Firebase
if(getApps().length === 0){
	const app = initializeApp(firebaseConfig);
}
export const db = getFirestore();