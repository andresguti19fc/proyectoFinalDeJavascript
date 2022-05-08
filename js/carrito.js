let data,
  carrito = [],
  total = 0,
  cantidad = 0,
  subtotal = 0,
  totalPagar = 0,
  url = "./base.json",
  carritoAdicta = document.getElementById(`carritoAdicta`),
  btnAgregarArticulo = document.getElementById("btnFormAgregar"),
  pagarTodo = document.getElementById("pagarTodo"),
  mostrarPago = document.getElementById("mostrarPago"),
  contadorCarrito = document.getElementById("contadorCarrito"),
  contadorCarritoPagarTodo = document.getElementById("contadorCarritoPagarTodo"),
  formReset = document.getElementById("formAgregarArticulos"),
  BBDD = [];
/* ++++++++++++++++++++++++++++ */
BBDD = JSON.parse(localStorage.getItem("BASEDEDATOS"));
carritoAdicta.addEventListener("click", renderizarCarrito);
btnAgregarArticulo.addEventListener("click", agregar);
pagarTodo.addEventListener("click", pagarTodoCarrito);

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
        position: 'top-end',
          icon: 'success',
          title: 'agrego uno mas al carrito',
          showConfirmButton: false,
          timer: 500
        })
        
      break;
    }
  }
  if (!existe) {
    producto.cantidad = 1;
    carrito.push(producto);
    Swal.fire({
      position: 'top-end',
        icon: 'success',
        title: 'se agrego al carrito',
        showConfirmButton: false,
        timer: 500
      })
      

  }
  window.localStorage.setItem('carrito', JSON.stringify(carrito));  
  contadorCarritoPagarTodo.innerHTML = carrito.length;
  carritoAdicta.innerHTML = "";
  renderizarCarrito();
  /*  */

}

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
 
  /* 
    carrito.splice(index, 1); */
  Swal.fire({
    title: '¿Estas seguro?',
    text: "no podras revertir los cambios!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    
    if (result.isConfirmed) {
     /*  Swal.fire(
        'Listo!',
        'El producto fue.',
        'success'
      )
       */
      
  
    }
    
  })
  carrito.splice(i, 1);
  carritoAdicta.innerHTML = "";
  contadorCarrito.innerHTML = carrito.length;
  contadorCarritoPagarTodo.innerHTML = carrito.length;
  total2 = carrito.reduce(
    (accum, producto) => accum + producto.precio * producto.cantidad,
    0
  );
  totalPagar = total2;
 
}
function comprarCarrito(i) {
  let { cantidad, precio } = carrito[i]; // destrructuracion
  var totalPrenda = cantidad * precio;

  swal.fire("Gracias por comprar", `total a pagar: ${totalPrenda}$`, "success");
  carrito.splice(i, 1);
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
            <img class="card-img-top img-fluid" src="images/${producto.imagen}" alt="..." />
                <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="card-title ">${producto.nombre}</h5>
                    <p class="card-text">
                        <strong>precio:</strong> ${producto.precio}$
                    </p>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-5">
        <div class="text-center"><button class="btn btn-outline-dark mt-auto mensajeComprar" onclick="agregarAlCarrito(${producto.length + 1})" id="${producto.id}" >Agregar al carrito</button></div>
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
    return abrirVentana("carritoDeCompras");
    }
    );

    
    