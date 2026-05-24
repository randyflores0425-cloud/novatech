const auth = firebase.auth();
const db = firebase.firestore();

// CONTROLADOR DE ACCESO Y SALDOS EN TIEMPO REAL
if (document.getElementById('user-email')) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            document.getElementById('user-email').innerText = user.email;
            
            // Escuchar cambios de saldo en Firestore en tiempo real
            db.collection("usuarios").doc(user.email).onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const saldoReal = data.saldo ? data.saldo : 0;
                    const ingresosReales = data.ingresos ? data.ingresos : 0;
                    
                    document.getElementById("useramount").innerText = "DOP " + Number(saldoReal).toFixed(2);
                    document.getElementById("all_income").innerText = "DOP " + Number(ingresosReales).toFixed(2);
                }
            });
        } else {
            window.location.href = "login.html";
        }
    });
}

// LÓGICA DE INTERACCIÓN DEL MENÚ CLONADO
document.addEventListener("DOMContentLoaded", () => {
    // Botón Recargar: Desplegar u ocultar tarjetas bancarias
    const btnRecharge = document.getElementById('btn-recharge');
    if (btnRecharge) {
        btnRecharge.addEventListener('click', () => {
            const depositSection = document.getElementById('deposit-section');
            if (depositSection.style.display === "none") {
                depositSection.style.display = "block";
                depositSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                depositSection.style.display = "none";
            }
        });
    }

    // Botón Retirar dinero
    const btnWithdraw = document.getElementById('btn-withdraw');
    if (btnWithdraw) {
        btnWithdraw.addEventListener('click', () => {
            alert("Para solicitar un retiro, configure sus datos de cuenta en 'Gestión de retiros bancarios' o contacte a soporte.");
        });
    }

    // Opciones adicionales del menú clonado
    const optSorteo = document.getElementById('opt-sorteo');
    if (optSorteo) {
        optSorteo.addEventListener('click', () => {
            alert("Sorteo de la suerte: No tienes tickets disponibles en este momento. Invierte en un nuevo equipo para obtener oportunidades.");
        });
    }

    const optReglas = document.getElementById('opt-reglas');
    if (optReglas) {
        optReglas.addEventListener('click', () => {
            alert("Reglas de NOVATECH:\n1. Las ganancias de los servidores se acreditan cada 24 horas.\n2. Los retiros se procesan de lunes a viernes.\n3. Cada usuario puede activar múltiples equipos tecnológicos.");
        });
    }

    const optHistorial = document.getElementById('opt-historial');
    if (optHistorial) {
        optHistorial.addEventListener('click', () => {
            alert("Historial: No se registran movimientos financieros recientes en su cuenta.");
        });
    }

    const optRetiros = document.getElementById('opt-retiros');
    if (optRetiros) {
        optRetiros.addEventListener('click', () => {
            alert("Gestión de retiros bancarios:\nPor favor, envíe su número de cuenta dominicana y su ID de usuario a soporte de WhatsApp para vinculación formal.");
        });
    }

    // Finalizar sesión
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            auth.signOut().then(() => {
                window.location.href = "login.html";
            });
        });
    }
});
