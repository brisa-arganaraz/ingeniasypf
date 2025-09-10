document.addEventListener("DOMContentLoaded", function () {
    const tablaReservas = document.querySelector(".gestion-reservas tbody");

    // 1. Traer las reservas desde localStorage
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    // 2. Limpiar la tabla actual (opcional si solo querés ver dinámicas)
    tablaReservas.innerHTML = "";

    // 3. Insertar cada reserva como fila
    reservas.forEach((reserva, index) => {
        const fila = document.createElement("tr");

        const precioPorHora = 4500;
        const precioTotal = reserva.horas * precioPorHora;

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${reserva.hora}</td>
            <td>${reserva.nombre}</td>
            <td>${reserva.telefono}</td>
            <td>${reserva.cancha}</td>
            <td>${reserva.horas}h</td>
            <td class="precio">$${precioTotal.toLocaleString()}</td>
            <td><span class="estado pendiente">⚠ Pendiente</span></td>
            <td>
              <button class="btn btn-efectivo">Efectivo</button>
              <button class="btn btn-transferencia">Transferencia</button>
            </td>
            <td>
              <button class="btn btn-confirmar">Confirmar</button>
              <button class="btn btn-cancelar">Cancelar</button>
            </td>
        `;

        tablaReservas.appendChild(fila);
    });
});

// 4. Delegar eventos a los botones recién agregados
tablaReservas.addEventListener("click", function (e) {
    const boton = e.target;
    const fila = boton.closest("tr");

    if (boton.classList.contains("btn-efectivo")) {
        fila.querySelector(".precio").textContent += " 💵";
    }

    if (boton.classList.contains("btn-transferencia")) {
        fila.querySelector(".precio").textContent += " 💳";
    }

    if (boton.classList.contains("btn-confirmar")) {
        const estado = fila.querySelector(".estado");
        estado.textContent = "✔ Confirmado";
        estado.className = "estado confirmado";
    }

    if (boton.classList.contains("btn-cancelar")) {
        const estado = fila.querySelector(".estado");
        estado.textContent = "✖ Cancelado";
        estado.className = "estado cancelado";
    }
});
