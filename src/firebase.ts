import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBEkGl4Lkr2L3DyBUDYGsOq-uRkl2I-aeM',
  authDomain: 'clone-9c3af.firebaseapp.com',
  databaseURL: 'https://clone-9c3af.firebaseio.com',
  projectId: 'clone-9c3af',
  storageBucket: 'clone-9c3af.appspot.com',
  messagingSenderId: '943320552141',
  appId: '1:943320552141:web:59067a2f0ab954be0ecf84',
  measurementId: 'G-E7QQPFK4C0',
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export type Timestamp = firebase.firestore.Timestamp;

export { db, auth };
