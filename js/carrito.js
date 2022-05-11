let data,
  carrito = [],
  carritoS = [],
  total = 0,
  total2 = 0,
  cantidad = 0,
  subtotal = 0,
  totalPagar = 0,
  precioTotalprenda = 0,
  url = "./base.json",
  carritoAdicta = document.getElementById(`carritoAdicta`),
  btnAgregarArticulo = document.getElementById("btnFormAgregar"),
  pagarTodo = document.getElementById("pagarTodo"),
  mostrarPago = document.getElementById("mostrarPago"),
  contadorCarrito = document.getElementById("contadorCarrito"),
  contadorCarritoPagarTodo = document.getElementById("contadorCarritoPagarTodo"),
  contador = [],
  formReset = document.getElementById("formAgregarArticulos"),
  BBDD = [];
BBDD = JSON.parse(localStorage.getItem("BASEDEDATOS"));
carritoAdicta.addEventListener("click", renderizarCarrito);
btnAgregarArticulo.addEventListener("click", agregar);
pagarTodo.addEventListener("click", pagarTodoCarrito);
/* ++++++++++++++++++++++++++++ */
async function renderizar() {
  const res = await fetch(url);
  data = await res.json();
  for (let i = 0; i < data.length; i++) {
    let { imagen, nombre, precio } = data[i]; //destrructuracion
    let tiendaAdicta = document.getElementById("tiendaAdicta");
    tiendaAdicta.innerHTML += `
        <div class="col-md-4 my-5">
            <div class="card h-100">
            <img class="card-img-top img-fluid" src="images/${imagen}" alt="..." />
                <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="card-title ">${nombre}</h5>
                    <p class="card-text">
                        <strong>precio:</strong> ${precio}$
                    </p>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-5">
        <div class="text-center"><button class="btn btn-outline-dark mt-auto mensajeComprar" onclick="agregarAlCarrito(${i})" id="${data[i].id}" >Agregar al carrito</button></div>
        </div>
        </div>
        </div>
        </div>
        `;
  }
  localStorage.setItem("BASEDEDATOS", JSON.stringify(data));
}
renderizar();

function agregarAlCarrito(i) {
  let producto = BBDD[i];
  let existe = false;
  for (let j = 0; j < carrito.length; j++) {
    if (carrito[j].id == producto.id) {
      existe = true;

      carrito[j].cantidad++;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "agrego uno mas al carrito",
        showConfirmButton: false,
        timer: 500,
      });

      break;
    }
  }
  if (!existe) {
    producto.cantidad = 1;
    carrito.push(producto);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "se agrego al carrito",
      showConfirmButton: false,
      timer: 500,
    });
  }
  contadorCarritoPagarTodo.innerHTML = carrito.length;
  contadorCarrito.innerHTML = carrito.length;
  total2 = carrito.reduce((accum, producto) => accum + producto.precio * producto.cantidad, 0);
  localStorage.setItem("total", JSON.stringify(total2));
  localStorage.setItem("contador", JSON.stringify(contadorCarrito.innerHTML));
  carritoAdicta.innerHTML = "";
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}
renderizarCarrito();
function renderizarCarrito() {
  carritoS = JSON.parse(sessionStorage.getItem("carrito"));
  if (carritoS === null) {
    console.log("no hay nada");
  } else {
    for (let i = 0; i < carritoS.length; i++) {
      let { imagen, nombre, precio, cantidad, id } = carritoS[i]; //destructuracion
      let carritoAdicta = document.getElementById("carritoAdicta");
      precioTotalprenda = cantidad * precio;
      carritoAdicta.innerHTML += `
      <tr>
      <td><img class="rounded-circle w-25 h-25" src="images/${imagen}" alt="${i}"></td>
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>${precio}</td>
      <td id="">${precioTotalprenda}</td>
      <td><button class="btn btn-outline-danger" onclick="eliminarDelCarrito(${i})" id="${id}">Eliminar</button></td>
      <td><button class="btn btn-outline-dark" onclick="comprarCarrito(${i})" id="comprar${id}">Comprar</button></td>   
      </tr>
      </tbody>
  `;
  }
  
total2 = JSON.parse(localStorage.getItem("total"));
contador = JSON.parse(localStorage.getItem("contador"));
contadorCarritoPagarTodo.innerHTML = contador;
contadorCarrito.innerHTML = contador;  
}
}
function comprarCarrito(i) {
  let arr = JSON.parse(sessionStorage.getItem("carrito"));
  let precioTotalPrenda = arr[i].precio * arr[i].cantidad;
  swal.fire("Compra realizada", `Gracias por comprar con nosotros ${precioTotalPrenda}`, "success");
  
  arr.splice(i, 1);
  total2 = arr.reduce((accum, producto) => accum + producto.precio * producto.cantidad, 0);
  localStorage.setItem("total", JSON.stringify(total2));
  sessionStorage.setItem("carrito", JSON.stringify(arr));
  carritoAdicta.innerHTML = "";
  let arrContador = JSON.parse(localStorage.getItem("contador"));
  arrContador--;
  localStorage.setItem("contador", JSON.stringify(arrContador));
  contadorCarrito.innerHTML = arrContador;
  contadorCarritoPagarTodo.innerHTML = arrContador;
  carritoAdicta.innerHTML = "";
 
  }
function eliminarDelCarrito(i) { 
  let arr = JSON.parse(sessionStorage.getItem("carrito"));
  arr.splice(i, 1);
  sessionStorage.removeItem(arr);
  total2 = arr.reduce((accum, producto) => accum + producto.precio * producto.cantidad, 0);
  
  localStorage.setItem("total", JSON.stringify(total2));
  sessionStorage.setItem("carrito", JSON.stringify(arr));
  let arrContador = JSON.parse(localStorage.getItem("contador"));
  arrContador--;
  localStorage.setItem("contador", JSON.stringify(arrContador));
  contadorCarrito.innerHTML = arrContador;
  contadorCarritoPagarTodo.innerHTML = arrContador;
 carritoAdicta.innerHTML = "";
}
function agregar(e) {
  e.preventDefault();
  if(usuario !== "" && isNaN("usuario") && contrasena !== "" && !isNaN(contrasena)){
    swal.fire("Gracias ", ``, "success");
  }else{
    swal.fire("debe iniciar sesion", "", "warning");
  }
  let nombre = document.getElementById("nombreFormAgregar").value;
  let precio = document.getElementById("precioFormAgregar").value;
  let imagen = document.getElementById("imagenFormAgregar").value;
  let id = BBDD.length + 1;
  let cantidad = 0;
  (nombre === "" || precio === "" || imagen === "") ? swal.fire("debe llenar todos los campos", "", "warning") : swal.fire("listo. su producto fue agregado.", "", "success"); // operador ternario
  let nuevoArticulo = {
    imagen,
    nombre,
    precio,
    id,
    cantidad,
  };
  
  BBDD = [...BBDD, nuevoArticulo];
  localStorage.setItem("BASEDEDATOS", JSON.stringify(BBDD));
  BBDD = JSON.parse(localStorage.getItem("BASEDEDATOS"));
  
  BBDD.forEach((producto) => {    
    tiendaAdicta.innerHTML = "";
    tiendaAdicta.innerHTML += `
    <div class="col-md-4 my-5">
            <div class="card h-100">
            <img class="card-img-top img-fluid" src="images/${
              producto.imagen
            }" alt="..." />
                <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="card-title ">${producto.nombre}</h5>
                    <p class="card-text">
                        <strong>precio:</strong> ${producto.precio}$
                    </p>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-5">
        <div class="text-center"><button class="btn btn-outline-dark mt-auto mensajeComprar" onclick="agregarAlCarrito(${
          producto.length + 1
        })" id="${producto.id}" >Agregar al carrito</button></div>
        </div>
        </div>
        </div>
        </div>
    `;

    });
    renderizar();
    formReset.reset();
}
function pagarTodoCarrito() {
  const DateTime = luxon.DateTime;
  const date = DateTime.local();
  const hora = DateTime.local().hour;
  const minuto = DateTime.local().minute;
  const segundo = DateTime.local().second;
  total2 = JSON.parse(localStorage.getItem("total"))
  setTimeout(() => {
    Swal.fire({
      title: `
      <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 align-itemns-center justify-content-center">
      <div class="col-md-12">
      <div class="alert alert-light" role="alert">
      <h4 class="alert-heading">Gracias por comprar</h4>
      <p>total a pagar: ${total2}$</p>
      <p>fecha: ${date.toFormat("dd/MM/yyyy")}</p>
      <p>hora: ${hora}:${minuto}:${segundo}</p>  
      </div>
      </div>
      </div>
      </div>    
      `,
      width: 800,
      padding: '1em',
      color: '#716add',
      showConfirmButton: false,
            timer: 2000
    })
    carrito.splice(0, carrito.length);
  }, 500);
  carritoAdicta.innerHTML = "";
  contadorCarrito.innerHTML = 0;
  contadorCarritoPagarTodo.innerHTML = 0; 
  sessionStorage.removeItem("carrito");
  localStorage.removeItem("total");
  localStorage.removeItem("contador");  
}
document.getElementById("carritoDeCompras").addEventListener("click", () => abrirVentana("carritoDeCompras"));
document.getElementById("articulosAgregados").addEventListener("click", () => abrirVentana("articulosAgregados"));
function abrirVentana(ventana) {
  if (ventana == "carritoDeCompras") {
    document.getElementById("carritoDeCompras").style.display = "block";
    document.getElementById("articulosAgregados").style.display = "none";
    document.getElementById("ecomerce").style.display = "none";
  } else if (ventana == "articulosAgregados") {
    document.getElementById("articulosAgregados").style.display = "block";
    document.getElementById("carritoDeCompras").style.display = "none";
    document.getElementById("ecomerce").style.display = "none";
  } else {
    document.getElementById("ecomerce").style.display = "block";
    document.getElementById("articulosAgregados").style.display = "none";
    document.getElementById("carritoDeCompras").style.display = "none";
  }
}
document.getElementById("carritoVentana").addEventListener("click", () => {
  return abrirVentana("carritoDeCompras");
});
document.getElementById("mercaderiaVentana").addEventListener("click", () => {
  return abrirVentana("articulosAgregados");
});
document.getElementById("ecomerceVentana").addEventListener("click", () => {
  return abrirVentana("ecomerce");
});

document.getElementById("carritoCompras").addEventListener("click", (e) => {
    e.preventDefault();
    return abrirVentana("carritoDeCompras");
    }
    );

    