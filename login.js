import { initializeApp } from 'firebase/app';
import { AuthErrorCodes,getAuth,signInWithEmailAndPassword  } from "firebase/auth";
import { getDatabase , get ,ref,child} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBlYVAwGxkOUqVVf8SX157y5hFLYTVvoIE",
  authDomain: "chatbot-geminiai.firebaseapp.com",
  projectId: "chatbot-geminiai",
  storageBucket: "chatbot-geminiai.appspot.com",
  messagingSenderId: "852792717761",
  appId: "1:852792717761:web:3d8b29f20ddd2a6e717f40",
  measurementId: "G-D5YGMWS70T"
};

const app=initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const dbref = ref(db);

const signIn = document.getElementById('signIn');

// Add event listener to the register button
signIn.addEventListener('click', function() {
    signInUser();
});

function signInUser() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        get(child(dbref, 'UserAuthList/'+ userCredential.user.uid)).then((snapshot)=>{
            if(snapshot.exists)
            {
                sessionStorage.setItem("user-info",JSON.stringify({
                    full_name:snapshot.val().full_name
                }))
                window.location.href = "index1.html";
            }
        })

    })

        .catch((err) => {
            if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
            setError("The password is too weak.");
          } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
            setError("The email address is already in use.");
          } else if (err.code === AuthErrorCodes.INVALID_EMAIL) {
            alert("The email address is Invalid.");
          } else if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
            alert("The Password is Incorrect.");
          } else if (err.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            alert("The Login Details are Invalid.");
          }else {
            console.log(err.code);
            alert(err.code);
          }
    });
}