// Credenciales de tu proyecto Novatech (Adaptadas para Web Móvil)
const firebaseConfig = {
  apiKey: "AIzaSyDLfYfeuBHDPNbswPm9oCe-CbNJw0Z4fOk",
  authDomain: "novatech-e0294.firebaseapp.com",
  projectId: "novatech-e0294",
  storageBucket: "novatech-e0294.firebasestorage.app",
  messagingSenderId: "1050314267105",
  appId: "1:1050314267105:web:852be575be54696e911aa0",
  measurementId: "G-7W9XT6JKT4"
};

// Inicialización global compatible con app.js y register.html
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}