import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDzdGqwmck-Vzwj5XA4LBLQX84KUVM7GPA",
    authDomain: "frontend-dbb71.firebaseapp.com",
    databaseURL: "https://frontend-dbb71.firebaseio.com",
    projectId: "frontend-dbb71",
    storageBucket: "frontend-dbb71.appspot.com",
    messagingSenderId: "884719492911"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;