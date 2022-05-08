let formIniciarSesion = document.getElementById("formIniciarSesion");
    let inicioDeSession = "";
    let usuario = "";
    let contrasena = "";
    formIniciarSesion.addEventListener("click", function(e) {
      e.preventDefault();
      let usuarioId = document.getElementById("usuarioId").value;
      let contrasenaId = document.getElementById("contrasenaId").value;
    
    
      sessionStorage.setItem("usuario", usuarioId);
      sessionStorage.setItem("contrasena", contrasenaId);
      usuario = sessionStorage.getItem("usuario");
      contrasena = sessionStorage.getItem("contrasena");
     
      inicioDeSession = (usuario !== "" && isNaN("usuario") && contrasena !== "" && !isNaN(contrasena)) ? true : false;
      inicioDeSession ? swal.fire("bienvenido", "", "success") : swal.fire("error", "", "error"); // operador ternario
    });


