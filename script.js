function responsiveMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
}

function cambiarTab(tabName) {
            // Ocultar todos los contenidos
    document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    });
            
            // Remover active de todos los tabs
    document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    });
            
            // Mostrar el contenido seleccionado
    document.getElementById(tabName).classList.add('active');
            
            // Activar el tab seleccionado
    event.target.classList.add('active');
}

function editarPerfil() {
    alert('🛠️ Editar Perfil\n\nOpciones disponibles:\n• Cambiar foto de perfil\n• Actualizar información personal\n• Configurar notificaciones\n• Cambiar contraseña\n• Preferencias de canchas\n\n¡Próximamente!');
}

function canjearRecompensa(tipo) {
    let mensaje = '';
    let puntos = 0;
            
    switch(tipo) {
        case 'pelota':
        mensaje = '⚽ ¡Pelota Nike canjeada!\n\nPodés retirarla en recepción.\nPuntos descontados: 800';
        puntos = 800;
        break;
        case 'cancha':
        mensaje = '🎫 ¡1 Hora GRATIS canjeada!\n\nCódigo: GRATIS2024\nVálido por 30 días.\nPuntos descontados: 1,500';
        puntos = 1500;
        break;
        case 'descuento':
        mensaje = '💸 ¡50% Descuento canjeado!\n\nCódigo: DESC50\nVálido para tu próxima reserva.\nPuntos descontados: 1,000';
        puntos = 1000;
        break;
        case 'combo':
        mensaje = '🥤 ¡Combo canjeado!\n\nRetirá tu bebida + snack en el buffet.\nPuntos descontados: 400';
        puntos = 400;
        break;
    }
            
    if (confirm('¿Confirmar canje?\n\n' + mensaje)) {
        alert('✅ ¡Canje exitoso!\n\n' + mensaje + '\n\nPuntos restantes: ' + (2450 - puntos));
        }
    }

        // Animaciones al cargar
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.stat-card');
        cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        });
    }); 