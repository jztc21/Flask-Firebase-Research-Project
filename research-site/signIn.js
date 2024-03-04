// ----------------- User Sign-In Page --------------------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need

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
// ---------------------- Sign-In User ---------------------------------------//
document.getElementById('signIn').onclick = function(){
    const email = document.getElementById('loginEmail').value; 
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user;
        //log sign in date in database
        // 'update' function will only add the last_login info and won't override anything
        let logDate = new Date();
        update(ref(db, 'users/'+user.uid+'/accountInfo'),{
            last_login: logDate,
        })
        .then(()=>{
            //User signed in successfully
            alert('User signed in successfully!')

            //Get snapshots of all the user info including the uid that will be passed to the login function
            //and stored in session and local storage
            get(ref(db, 'users/'+user.uid+'/accountInfo')).then((snapshot)=>
            {
                if(snapshot.exists()){
                    console.log(snapshot.val());
                    logIn(snapshot.val());
                } else{
                    console.log("User does not exist")
                }
            })
        })
        .catch((error) => {
            //sign in 
            alert(error)
        })
    }).catch((error) =>{
        const errorMessage = error.message;
        alert(errorMessage);
    })     
}


// ---------------- Keep User Logged In ----------------------------------//
function logIn(user){
    let keepLoggedIn= document.getElementById('keepLoggedInSwitch').ariaChecked;
    //Session storage is temporary (only while active session)
    // Info saved as a string (must conver js object to string)
    //Session storage sill be cleared with a signout function in home
    if(!keepLoggedIn){
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location="home.html" //redirect browser to home.html


    }
    //local storage is permanent 
    //local storage will be cleared with signout function
    else{
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
        window.location="home.html" //redirect browser to home.html
        

    }
}
