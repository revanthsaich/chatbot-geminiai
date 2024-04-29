import { initializeApp } from 'firebase/app';
import { AuthErrorCodes,getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { getDatabase ,set,ref } from "firebase/database";


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

const registerButton = document.getElementById('registerButton');

// Add event listener to the register button
registerButton.addEventListener('click', function() {
    register();
});

function register() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
    console.log(email);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const userUid= userCredential.user.uid;
        const userData = {
          email:email,
          full_name:full_name
        };
        set(ref(db, 'UserAuthList/' + userUid), userData)
            .then(() => {
                // Store full name in session storage
                sessionStorage.setItem("user-info", JSON.stringify({
                    full_name: userData.full_name
                }));

                // Redirect to index1.html
                window.location.href = "/app.html";
            })
            .catch((error) => {
                // Handle any errors that occur during database write
                console.error("Error writing user data to database:", error);
            });
    })
        .catch((err) => {
            if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
            alert("The password is too weak.");
          } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
            alert("The email address is already in use.");
          } else if (err.code === AuthErrorCodes.INVALID_EMAIL) {
            alert("The email address is Invalid.");
          } else {
            console.log(err.code);
            alert(err.code);
          }
    });
}