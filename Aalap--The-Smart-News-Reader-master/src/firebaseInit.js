import firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDsoVgeLXwUq_6268D76ZUx0TckFzcEXyI',
  authDomain: 'zonashavistaassociation.firebaseapp.com',
  databaseURL: 'https://zonashavistaassociation.firebaseio.com',
  projectId: 'zonashavistaassociation',
  storageBucket: 'zonashavistaassociation.appspot.com',
  messagingSenderId: '930767350198',
  appId: '1:930767350198:web:1e16aba9039eea134cf917',
  measurementId: 'G-GRV2QXBFP4'
};
console.log('\n\nfirebase----?', firebase);
firebase && firebase.initializeApp(firebaseConfig);
export default firebase;
