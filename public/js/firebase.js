const firebaseConfig = {
  apiKey: "AIzaSyAoP8YH1nDmC-uY_awzK-RFbECY-XagkjQ",
  authDomain: "amoswebblog.firebaseapp.com",
  projectId: "amoswebblog",
  storageBucket: "amoswebblog.appspot.com",
  messagingSenderId: "877113891987",
  appId: "1:877113891987:web:44e6588dffafd19a078166"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
let db = firebase.firestore();
