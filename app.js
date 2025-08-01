let carpeta = "/ingeniasypf";
// Detectamos si esta en locla o online porque sino la ruta de la raiz cambia
const isLocal =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";
if (isLocal) {
  carpeta = "";
}

/* Local stoorage y Array */
let usuarios = [];

function cargarUsuarios() {
  const datos = localStorage.getItem("usuarios");
  if (datos) {
    usuarios = JSON.parse(datos);
  } else {
    /* simulacion de usuario con Array */
    usuarios = [
      {
        id: 1,
        nombre: "Maria",
        apellido: "Gonzalez",
        email: "maria@gmail.com",
        fechaNacimiento: "1991-06-20",
        telefono: "+54 11 9876-5432",
        usuario: "dr",
        contrasena: "123456",
      },
    ];
    guardarUsuarios();
  }
}

function guardarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function guardarUsuarioLogueado(usuario) {
  sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
}

function obtenerUsuarioLogueado() {
  const datos = sessionStorage.getItem("usuarioLogueado");
  return datos ? JSON.parse(datos) : null;
}

function cerrarSesion() {
  sessionStorage.removeItem("usuarioLogueado");
  window.location.href = carpeta + "/pages/login.html";
}

/* ---------- FUNCIONES DE USUARIOS ---------- */

function registrarUsuario(nuevoUsuario) {
  const existeEmail = usuarios.some((u) => u.email === nuevoUsuario.email);
  const existeUsuario = usuarios.some(
    (u) => u.usuario === nuevoUsuario.usuario
  );

  if (existeEmail) {
    Swal.fire({
      icon: "error",
      title: "Correo ya registrado",
      text: "Por favor usá otro correo.",
      confirmButtonColor: "#05a500",
    });
    return false;
  }
  if (existeUsuario) {
    Swal.fire({
      icon: "error",
      title: "Usuario ya existe",
      text: "Por favor elegí otro nombre de usuario.",
      confirmButtonColor: "#05a500",
    });
    return false;
  }

  nuevoUsuario.id =
    usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  usuarios.push(nuevoUsuario);
  guardarUsuarios();
  return true;
}

function login(email, contrasena) {
  return usuarios.find((u) => u.email === email && u.contrasena === contrasena);
}


/*  ---------- FUNCIONALIDADES POR PÁGINA ----------*/

document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios();

  const usuario = obtenerUsuarioLogueado();
  const ruta = window.location.pathname;

  /* Redirecciones */
  const paginasPublicas = [
    carpeta + "/",
    carpeta + "/index.html",
    carpeta + "/pages/login.html",
    carpeta + "/pages/registro.html",
    carpeta + "/pages/servicios.html",
    carpeta + "/pages/reglamento.html",
    carpeta + "/pages/contacto.html",
  ];


  const esPublica = paginasPublicas.includes(ruta);

  if (
    usuario &&
    (ruta.includes("login.html") || ruta.includes("registro.html"))
  ) {
    window.location.href = carpeta + "/pages/perfil.html";
    return;
  }

  if (!usuario && !esPublica) {
    window.location.href = carpeta + "/pages/login.html"; //!!!!!!!!!!!!!ES ESTA LINEA LA DEL ERROR -------------------------------------------
    return;
  }



  /*  ---------- FUNCIONES CAMBIO DE AVATARS ----------*/

  const avatar = document.getElementById("avatar");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");
  const avatars = [
    "", //vacio para el avatar de las iniciales
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Christian",
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Brian",
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Ryan",
  ];
  let currentAvatarIndex = 0;

  function updateAvatar() {
    if (currentAvatarIndex == 0) {
      avatar.innerText = usuario.nombre.charAt(0) + usuario.apellido.charAt(0);
       avatar.style.background = "linear-gradient(135deg, #2e7d32, #4caf50)";
      avatar.style.backgroundImage = "";
    }
    else {
      avatar.style.backgroundImage = `url("${avatars[currentAvatarIndex]}")`;
      avatar.innerText = "";
    }
  }

  if (avatar) {
    leftArrow.addEventListener("click", () => {
      currentAvatarIndex--;
      if (currentAvatarIndex < 0) {
        currentAvatarIndex = avatars.length - 1;
      }
      console.log("current avatar index " + currentAvatarIndex);
      updateAvatar();
    });
  }

  if (avatar) {
    rightArrow.addEventListener("click", () => {
      currentAvatarIndex++;
      if (currentAvatarIndex >= avatars.length) {
        currentAvatarIndex = 0;
      }
      console.log("current avatar index " + currentAvatarIndex);
      updateAvatar();
    });
  }



  /*   Header */
  const logoLink = document.querySelector(".logo a");
  if (logoLink)
    logoLink.href = usuario
      ? carpeta + "/pages/perfil.html"
      : carpeta + "/pages/login.html";

  const iconContainer = document.getElementById("icon-container");
  if (usuario && iconContainer) {
    iconContainer.innerHTML = "";

    const linkPerfil = document.createElement("a");
    linkPerfil.href = carpeta + "/pages/perfil.html";
    linkPerfil.style.marginRight = "10px";

    const imgPerfil = document.createElement("img");
    imgPerfil.src = carpeta + "/imagenes/iconoLogin.png";
    imgPerfil.alt = "Perfil";
    imgPerfil.style.width = "32px";
    imgPerfil.style.height = "32px";
    imgPerfil.style.borderRadius = "50%";
    imgPerfil.style.verticalAlign = "middle";
    imgPerfil.style.cursor = "pointer";

    linkPerfil.appendChild(imgPerfil);

    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrarSesion";
    btnCerrar.className = "btn btn-danger";
    btnCerrar.style.cursor = "pointer";
    btnCerrar.innerHTML =
      '<i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión';
    btnCerrar.onclick = () => cerrarSesion();

    iconContainer.appendChild(linkPerfil);
    iconContainer.appendChild(btnCerrar);
  }

  /* REGISTRO/FORMULARIO AGREGAR USUARIO------------ */
  if (document.querySelector("form") && ruta.includes("registro.html")) {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const email = document.getElementById("email").value.trim();
      const fechaNacimiento = document.getElementById("fechaNacimiento").value;
      const telefono = document.getElementById("telefono").value.trim();
      const usuarioNuevo = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value;

      const nuevoUsuario = {
        nombre,
        apellido,
        email,
        fechaNacimiento,
        telefono,
        usuario: usuarioNuevo,
        contrasena,
      };

      if (registrarUsuario(nuevoUsuario)) {
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Ya podés iniciar sesión.",
          confirmButtonColor: "#05a500",
        }).then(() => {
          window.location.href = carpeta + "/pages/login.html";
        });
      }
    });
  }

  /* ----LOGIN */
  if (ruta.includes("login.html")) {
    const btnLogin = document.querySelector(".login-container button");
    btnLogin.addEventListener("click", () => {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const usuarioLogin = login(email, password);
      if (usuarioLogin) {
        guardarUsuarioLogueado(usuarioLogin);
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido, " + usuarioLogin.nombre + "!",
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
        }).then(() => {
          window.location.href = carpeta + "/pages/perfil.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Correo o contraseña incorrectos",
          text: "Verificá tus datos e intentá de nuevo.",
          confirmButtonColor: "#05a500",
        });
      }
    });
  }

  /* PERFIL- VISUALIZACION DE LISTA DE USUARIOS AL FINAL DE PAGINA */
  if (ruta.includes("perfil.html")) {
    if (!usuario) {
      window.location.href = carpeta + "/pages/login.html";
      return;
    }

    const nombreCompleto = document.querySelector(".user-info h1");
    if (nombreCompleto)
      nombreCompleto.textContent = usuario.nombre + " " + usuario.apellido;

    const detalles = document.querySelector(".user-details");
    if (detalles)
      detalles.innerHTML = `
        <p>📧 ${usuario.email}</p>
        <p>📱 ${usuario.telefono || "No registrado"}</p>
        <p>🎂 ${new Date(usuario.fechaNacimiento).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
      })}</p>
        <p>📅 Socio desde: ${new Date().getFullYear()}</p>
      `;

    /*Lista de usuarios registrados  */
    const contenedorLista = document.getElementById("lista-usuarios");
    if (contenedorLista) {
      contenedorLista.innerHTML = `
    <div class="mt-5">
      <h4 class="fw-bold text-success">👥 Últimos usuarios registrados</h4>
      <p class="text-muted">USUARIOS REGISTRADOS RECIENTEMENTE QUE SON PARTE DEL CLUB:</p>
      <ul class="list-group">
        ${usuarios
          .map(
            (u) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span><strong>${u.nombre} ${u.apellido}</strong></span>
            <small class="text-muted">${u.email}</small>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;
    }
  }
});
