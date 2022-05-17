import * as firebase from 'firebase'; //importing firebase

  var firebaseConfig = {  //configurating firebase
    apiKey: "AIzaSyDSymNxOPPi3qeLVmNBHxNHMzvIozwUqOs",  //special API key to connect to a database
    authDomain: "prime-46136.firebaseapp.com",    
    databaseURL: "https://prime-46136.firebaseio.com",
    projectId: "prime-46136",
    storageBucket: "prime-46136.appspot.com",
    messagingSenderId: "75212605754",
    appId: "1:75212605754:web:5d486f9887c9d3fbcee803",
    measurementId: "G-7SDHZYN2F1"
  };
  firebase.initializeApp(firebaseConfig);   //initializating the app using configuration
  firebase.analytics();
  export  default firebase;