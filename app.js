// app.js - Lógica Centralizada y Dinámica para NOVATECH CLUB

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicialización de datos de prueba en la interfaz (DOP - Peso Dominicano)
    initPlatformData();

    // 2. Ejecutar la generación automática de enlaces de referidos si estamos en la sección de Equipo
    if (document.getElementById("myLink")) {
        generateReferralLink();
    }
});

/**
 * Genera el enlace de referidos dinámicamente usando el dominio actual en Vercel
 */
function generateReferralLink() {
    const codeElement = document.getElementById("myCode");
    const linkElement = document.getElementById("myLink");

    if (codeElement && linkElement) {
        const userCode = codeElement.innerText.trim();
        // Detecta automáticamente si estás en novatech-nine-lemon.vercel.app o localhost
        const currentDomain = window.location.origin; 
        
        // Construye el link apuntando a tu página de registro nativa
        const cleanReferralLink = `${currentDomain}/registro.html?ref=${userCode}`;
        
        // Lo muestra en pantalla de forma limpia
        linkElement.innerText = cleanReferralLink;
    }
}

/**
 * Carga los valores iniciales respetando la moneda DOP declarada para el proyecto
 */
function initPlatformData() {
    const balanceElement = document.getElementById("userBalance");
    if (balanceElement) {
        balanceElement.innerText = "DOP 200.00";
    }
}

/**
 * Función global para copiar los elementos al portapapeles sin romper la navegación
 */
function copyText(elementId, successMessage) {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    const textToCopy = targetElement.innerText || targetElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Alerta personalizada en el idioma de la plataforma
        alert(successMessage || "¡Copiado con éxito!");
    }).catch(err => {
        console.error('Error al intentar copiar el enlace: ', err);
    });
}