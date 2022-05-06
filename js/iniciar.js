let formIniciarSesion = document.getElementById("formIniciarSesion");

formIniciarSesion.addEventListener("click", function(e) {
  e.preventDefault();
  let usuarioId = document.getElementById("usuarioId").value;
  let contrasenaId = document.getElementById("contrasenaId").value;


  sessionStorage.setItem("usuario", usuarioId);
  sessionStorage.setItem("contrasena", contrasenaId);
  let usuario = sessionStorage.getItem("usuario");
  let contrasena = sessionStorage.getItem("contrasena");
 
  const inicioDeSession = (usuario !== "" && isNaN("usuario") && contrasena !== "" && !isNaN(contrasena)) ? true : false;
  inicioDeSession ? swal.fire("bienvenido", "", "success") : swal.fire("error", "", "error"); // operador ternario
});



