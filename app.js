// Variable global para las instancias de Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// -------------------------------------------------------------
// CONTROLADOR DE ACCESO EN VIVO (Detecta sesión del usuario)
// -------------------------------------------------------------
if (document.getElementById('user-email')) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Imprimir el correo electrónico del usuario conectado en el panel
            document.getElementById('user-email').innerText = user.email;
            
            // Conexión directa a Firestore Database para leer saldo en vivo
            // Busca en la colección 'usuarios' el documento correspondiente al correo del usuario
            db.collection("usuarios").doc(user.email).onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    
                    // Asegurar que si los campos no existen, muestren 0
                    const saldoReal = data.saldo ? data.saldo : 0;
                    const ingresosReales = data.ingresos ? data.ingresos : 0;
                    
                    // Actualizar la interfaz en pesos dominicanos (DOP)
                    document.getElementById("useramount").innerText = "DOP " + Number(saldoReal).toFixed(2);
                    document.getElementById("all_income").innerText = "DOP " + Number(ingresosReales).toFixed(2);
                } else {
                    console.log("El usuario no tiene un documento creado en Firestore aún.");
                }
            }, (error) => {
                console.error("Error al obtener datos en tiempo real: ", error);
            });

        } else {
            // Si el usuario intenta entrar al panel sin loguearse, lo expulsa al login
            window.location.href = "login.html";
        }
    });
}

// -------------------------------------------------------------
// LÓGICA DE INICIO DE SESIÓN (LOGIN)
// -------------------------------------------------------------
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Éxito: Redirigir directamente al panel index.html
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert("Error de acceso: " + error.message);
            });
    });
}

// -------------------------------------------------------------
// CONTROLADORES DE INTERFAZ (BOTONES DE ACCIÓN)
// -------------------------------------------------------------
const btnRecharge = document.getElementById('btn-recharge');
if (btnRecharge) {
    btnRecharge.addEventListener('click', () => {
        // Hace un desplazamiento suave en la pantalla directo a la sección de tus bancos
        document.getElementById('deposit-section').scrollIntoView({ behavior: 'smooth' });
    });
}

const btnWithdraw = document.getElementById('btn-withdraw');
if (btnWithdraw) {
    btnWithdraw.addEventListener('click', () => {
        alert("Para procesar retiros de fondos, por favor póngase en contacto directo a través de nuestra comunidad oficial de WhatsApp.");
    });
}

const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        auth.signOut().then(() => {
            window.location.href = "login.html";
        });
    });
}