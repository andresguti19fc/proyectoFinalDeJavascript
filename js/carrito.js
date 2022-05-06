let data,
  carrito = [],
  total = 0,
  cantidad = 0,
  subtotal = 0,
  totalPagar = 0,
  url = "./base.json",
  BBDD = [];
/* ++++++++++++++++++++++++++++ */
BBDD = JSON.parse(localStorage.getItem("BASEDEDATOS"));
let carritoAdicta = document.getElementById(`carritoAdicta`);
carritoAdicta.addEventListener("click", renderizarCarrito);
let btnAgregarArticulo = document.getElementById("btnFormAgregar");
btnAgregarArticulo.addEventListener("click", agregar);
let pagarTodo = document.getElementById("pagarTodo");
pagarTodo.addEventListener("click", pagarTodoCarrito);
let mostrarPago = document.getElementById("mostrarPago");
let contadorCarrito = document.getElementById("contadorCarrito");
let contadorCarritoPagarTodo = document.getElementById(
  "contadorCarritoPagarTodo"
);
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

function agregarAlCarrito(i) {
  let producto = BBDD[i];
  let existe = false;
  for (let j = 0; j < carrito.length; j++) {
    if (carrito[j].id == producto.id) {
      existe = true;
      carrito[j].cantidad++;
      break;
    }
  }
  if (!existe) {
    producto.cantidad = 1;
    carrito.push(producto);
  }
  carritoAdicta.innerHTML = "";
  renderizarCarrito();
}
console.log(carrito);
function renderizarCarrito() {
  for (let i = 0; i < carrito.length; i++) {
    let { nombre, precio, cantidad, id } = carrito[i];
    let precioTotalprenda = cantidad * precio;
    carritoAdicta.innerHTML += `
    <tr>
    <td><img class="rounded-circle w-25 h-25" src="images/${carrito[i].imagen}" alt="${i}"></td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    <td id="">${precioTotalprenda}</td>
    <td><button class="btn btn-outline-danger" onclick="eliminarDelCarrito(${i})" id="${id}">Eliminar</button></td>
    <td><button class="btn btn-outline-dark" onclick="comprarCarrito(${i})" id="${id}">Comprar</button></td>   
    </tr>
    </tbody>
`;
    contadorCarrito.innerHTML = carrito.length;
    total2 = carrito.reduce(
      (accum, producto) => accum + producto.precio * producto.cantidad,
      0
    );
  }
}
function eliminarDelCarrito(i) {
  //eliminar del carrito
  index = carrito.findIndex((producto) => producto.id == carrito[i].id);
  console.log(index);
    carrito.splice(index, 1);
    
    carritoAdicta.innerHTML = "";


}
function comprarCarrito(i) {
  let { cantidad, precio } = carrito[i]; // destrructuracion
  var totalPrenda = cantidad * precio;

  swal.fire("Gracias por comprar", `total a pagar: ${totalPrenda}$`, "success");
  carrito.splice(i, 1);
  carritoAdicta.innerHTML = "";
}

/* function agregar(nombre, precio, imagen, id, cantidad) {
    
   nombre.preventDefault();
   let imagenInput = document.getElementById("imagenFormAgregar").value;
    let inputAgregarArticulo = document.getElementById("nombreFormAgregar").value;
    let inputAgregarPrecio = document.getElementById("precioFormAgregar").value;
   imagen = imagenInput; 
   nombre=inputAgregarArticulo;
   precio=inputAgregarPrecio;
cantidad=0;
id= BBDD.length + 1;
    let nuevoArticulo = JSON.parse(localStorage.getItem("BASEDEDATOS"));
    nuevoArticulo.push(new Basededatos(imagen, nombre, precio, id, cantidad));
    BBDD = [...BBDD, nuevoArticulo];
    localStorage.setItem("BASEDEDATOS", JSON.stringify(BBDD));

  
    tiendaAdicta.innerHTML = "";
  renderizar();
}  */

function agregar(e) {
  e.preventDefault();
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
}
renderizar();


function pagarTodoCarrito() {
  const DateTime = luxon.DateTime;
  const date = DateTime.local();
  const hora = DateTime.local().hour;
  const minuto = DateTime.local().minute;
  const segundo = DateTime.local().second;

  swal.fire("Gracias por comprar", `total a pagar: ${total2}$`, "success");
  carrito.splice(0, carrito.length);
  mostrarPago.innerHTML = `
  <div class="container px-4 px-lg-5 mt-5">
  <div class="row gx-4 gx-lg-5 align-itemns-center justify-content-center">
  <div class="col-md-12">
  <div class="alert alert-dark" role="alert">
  <h4 class="alert-heading">Gracias por comprar</h4>
  <p>total a pagar: ${total2}$</p>
  <p>fecha: ${date.toFormat("dd/MM/yyyy")}</p>
  <p>hora: ${hora}:${minuto}:${segundo}</p>
  <div>
  <h5>articulos en el carrito:</h5>  
  </div>
  </div>
  </div>
  </div>

  `;
  carritoAdicta.innerHTML = "";
}
/*** datos de la compra ***/

document
  .getElementById("carritoDeCompras")
  .addEventListener("click", () => abrirVentana("carritoDeCompras"));
document
  .getElementById("articulosAgregados")
  .addEventListener("click", () => abrirVentana("articulosAgregados"));
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
document.getElementById("1").addEventListener("click", () => {
    console.log("funciono");
  return abrirVentana("carritoDeCompras");
});
document.getElementById("2").addEventListener("click", () => {
  return abrirVentana("articulosAgregados");
});
document.getElementById("3").addEventListener("click", () => {
  return abrirVentana("ecomerce");
});

document.getElementById("carritoCompras").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("funciono");
    return abrirVentana("carritoDeCompras");
    }
    );
