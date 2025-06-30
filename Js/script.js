function responsiveMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
}

function cambiarTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function editarPerfil() {
    Swal.fire({
        title: '🛠️ Editar Perfil',
        html: `
            <ul style="text-align:left;">
                <li>Cambiar foto de perfil</li>
                <li>Actualizar información personal</li>
                <li>Configurar notificaciones</li>
                <li>Cambiar contraseña</li>
                <li>Preferencias de canchas</li>
            </ul>
            <p>¡Proximamente!<p/>
        `,
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#05a500'
    });
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

    Swal.fire({
        title: '¿Confirmar canje?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, canjear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#05a500',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '✅ ¡Canje exitoso!',
                text: mensaje + '\n\nPuntos restantes: ' + (2450 - puntos),
                icon: 'success',
                confirmButtonColor: '#05a500'
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
