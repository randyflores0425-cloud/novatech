import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyDLfYfeuBHDPNbswPm9oCe-CbNJw0Z4fOk",
authDomain: "novatech-e0294.firebaseapp.com",
projectId: "novatech-e0294",
storageBucket: "novatech-e0294.firebasestorage.app",
messagingSenderId: "1050314267105",
appId: "1:1050314267105:web:852be575be54696e911aa0",
measurementId: "G-7W9XT6JKT4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

window.registro = function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

createUserWithEmailAndPassword(auth,email,password)

.then(()=>{
alert("Cuenta creada");
window.location="login.html";
})

.catch((error)=>{
alert(error.message);
});

}

window.login = function(){

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

signInWithEmailAndPassword(auth,email,password)

.then(()=>{
window.location="panel.html";
})

.catch((error)=>{
alert(error.message);
});

}