// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
    apiKey: "AIzaSyBx83WUVgovXHFKx-5Lxm75UdyvLnNR5_U",
    authDomain: "to-do-live-2.firebaseapp.com",
    projectId: "to-do-live-2",
    storageBucket: "to-do-live-2.appspot.com",
    messagingSenderId: "538854901792",
    appId: "1:538854901792:web:7a64babd69032a4912d445",
    measurementId: "G-2CTHJKTHXW"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

