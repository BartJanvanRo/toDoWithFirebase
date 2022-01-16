// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {

    apiKey: "AIzaSyCs99Z0jZpyyefdrHQ-xJvluOX4M1SVsYM",

    authDomain: "todo-1801c.firebaseapp.com",

    projectId: "todo-1801c",

    storageBucket: "todo-1801c.appspot.com",

    messagingSenderId: "275124322598",

    appId: "1:275124322598:web:ebc7eef1f52444b91b41e7",

    measurementId: "G-Y19ESMLLWE"

};


// Initialize Firebase 
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

