import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// CREDENCIALES REALES EXTRACTADAS DE TU CONSOLA DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyDLfYfeuBHDPNbswPm9oCe-CbNJwOZ4fOk",
    authDomain: "novatech-e0294.firebaseapp.com",
    databaseURL: "https://novatech-e0294-default-rtdb.firebaseio.com",
    projectId: "novatech-e0294",
    storageBucket: "novatech-e0294.firebasestorage.app",
    messagingSenderId: "1050314267105",
    appId: "1:1050314267105:web:852be575be54696e911aa0",
    measurementId: "G-7M9XToJKT4"
};

// Inicializar Servicios
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// --- CONTROL DE REGISTRO DE USUARIOS ---
const formRegistro = document.getElementById('registro-form');
if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Creamos un registro base limpio para el usuario en la base de datos
                set(ref(db, 'usuarios/' + user.uid), {
                    email: email,
                    amount: 0.00,
                    day_income: 0.00,
                    all_income: 0.00,
                    fecha_creacion: new Date().toISOString()
                }).then(() => {
                    alert("¡Cuenta creada exitosamente en Novatech!");
                    window.location.href = "index.html";
                });
            })
            .catch((error) => {
                alert("Error en registro: " + error.message);
            });
    });
}

// --- CONTROL DE INICIO DE SESIÓN ---
const formLogin = document.getElementById('login-form');
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('log-email').value;
        const password = document.getElementById('log-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("¡Bienvenido de vuelta a Novatech!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert("Error de credenciales: " + error.message);
            });
    });
}

// --- ESCUCHA EN TIEMPO REAL (INDEX / BALANCES) ---
onAuthStateChanged(auth, (user) => {
    // Si estamos en las páginas de login o registro, dejamos que el usuario actúe libremente
    const pathname = window.location.pathname;
    const enPaginaAuth = pathname.includes("login.html") || pathname.includes("registro.html");

    if (user) {
        if (enPaginaAuth) {
            window.location.href = "index.html";
            return;
        }

        // Leer datos del clon de forma segura
        const userRef = ref(db, 'usuarios/' + user.uid);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const elemAmount = document.getElementById("amount");
                const elemDayIncome = document.getElementById("day_income");
                const elemAllIncome = document.getElementById("all_income");

                if (elemAmount) elemAmount.innerHTML = "DOP " + parseFloat(data.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
                if (elemDayIncome) elemDayIncome.innerHTML = "DOP " + parseFloat(data.day_income || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
                if (elemAllIncome) elemAllIncome.innerHTML = "DOP " + parseFloat(data.all_income || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
            }
        });
    } else {
        // Redirección forzada de seguridad si intenta entrar a la aplicación sin sesión
        if (!enPaginaAuth) {
            window.location.href = "login.html";
        }
    }
});