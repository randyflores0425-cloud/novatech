// Configuración Centralizada de Enlaces y Datos de Novatech
const NOVATECH_CONFIG = {
    whatsappGroup: "https://chat.whatsapp.com/IfgCgvipDkhK9lkXoq99wW", // TU ENLACE REAL DE WHATSAPP VERIFICADO
    telegramChannel: "https://t.me/novatech_official",
    welcomeBonus: 200, // Bono fijo de 200 DOP al registrarse
};

// Carga Inicial de Datos en Pantalla
document.addEventListener("DOMContentLoaded", () => {
    // Inyectar enlace de WhatsApp en los botones de Soporte y Servicio al Cliente
    const waButtonHome = document.getElementById("whatsappSupport");
    const waButtonMenu = document.getElementById("whatsappSupportMenu");

    if (waButtonHome) waButtonHome.href = NOVATECH_CONFIG.whatsappGroup;
    if (waButtonMenu) waButtonMenu.href = NOVATECH_CONFIG.whatsappGroup;

    // Sincronizar saldos guardados localmente o por defecto
    initializeBalances();
});

function initializeBalances() {
    let currentBalance = localStorage.getItem("novatech_balance");
    if (!currentBalance) {
        localStorage.setItem("novatech_balance", NOVATECH_CONFIG.welcomeBonus);
        currentBalance = NOVATECH_CONFIG.welcomeBonus;
    }

    // Inyectar balances en los elementos HTML existentes si están en pantalla
    if (document.getElementById("userBalance")) {
        document.getElementById("userBalance").innerText = `DOP ${parseFloat(currentBalance).toFixed(2)}`;
    }
    if (document.getElementById("profileBalance")) {
        document.getElementById("profileBalance").innerText = `DOP ${parseFloat(currentBalance).toFixed(2)}`;
    }
}

// Función para simular o procesar compra de productos VIP
function buyProduct(vipLevel, price, dailyReturn) {
    let currentBalance = parseFloat(localStorage.getItem("novatech_balance") || 0);

    if (currentBalance < price) {
        alert(`Saldo insuficiente. La compra de ${vipLevel} requiere ${price} DOP.`);
        return;
    }

    // Descontar saldo e indicar procesamiento
    currentBalance -= price;
    localStorage.setItem("novatech_balance", currentBalance);
    
    alert(`¡Compra procesada con éxito! Has adquirido el nivel ${vipLevel}.\nTu inversión empezará a reflejar dividendos de ${dailyReturn} DOP en un plazo de 24 horas.`);
    location.reload();
}

function logout() {
    alert("Cerrando sesión de la plataforma Novatech...");
    // Redirección opcional a pantalla de salida o login
    window.location.href = "login.html";
}