// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import{getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword}
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
import{getDatabase, ref, set, update, child, get}
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

  const firebaseConfig = {
    apiKey: "AIzaSyAUmjtQlwzyPhjfGQV8vnqhnSK9_WGFG0Y",
    authDomain: "jc-fb-rtd-demo.firebaseapp.com",
    projectId: "jc-fb-rtd-demo",
    storageBucket: "jc-fb-rtd-demo.appspot.com",
    messagingSenderId: "819343832163",
    appId: "1:819343832163:web:9a57f57f2104f6703cf456"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
// ---------------- Register New Uswer --------------------------------//
document.getElementById('submitData').onclick = function(){
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPass').value;
  if(!validation(firstName, lastName, email, password )){
    return;
  };
  //create new app user using email/password auth
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
  const user = userCredential.user;
  //add user account info to the FRD
  //set function will create a new ref or completely replace existing one
  //Each new user will be placed under user node
  set(ref(db, 'users/'+user.uid+ '/accountInfo'), {
    uid: user.uid, //saver user id for home js reference
    email: email,
    password: encryptPass(password),
    firstname: firstName,
    lastname: lastName,


  })
  .then(()=>{
    //data saved successfully
    alert("User created successfully")
  })
  .catch((error)=>{
    alert(error)
  });
})
.catch((error)=>{
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);
});
 }


// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password ){
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9]+@ctemc\.org$/;
  if(isEmptyorSpaces(firstName || isEmptyorSpaces(lastName)|| isEmptyorSpaces(email)||isEmptyorSpaces(password))){
    alert("Please complete all fields");
    return false;
  }
  if(!fNameRegex.test(firstName)){
    alert("Invalid first name")
    return false;
  }
  if(!lNameRegex.test(lastName)){
    alert("Invalid last name")
    return false;

  }
  if(!emailRegex.test(email)){
    alert("Invalid email")
    return false;

  }
  return true;
}

// --------------- Password Encryption -------------------------------------//

function encryptPass(password){
  let encrytped = CryptoJS.AES.encrypt(password, password)
  return encrytped.toString();
}
