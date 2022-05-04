/* function renderizarHtml(){
  fetch("http://localhost:3000/bbdd")
  .then(res => res.json())
  .then(data => {
    let tiendaAdicta = document.getElementById("tiendaAdicta");
    for (let i = 0; i < data.length; i++) {
      let { imagen, nombre, precio } = data[i]; //destrructuracion
      tiendaAdicta.innerHTML += `

      <div class="col-md-4 my-5">
          <div class="card h-100">
          <img class="card-img-top img-fluid" src="images/${imagen}" alt="..." />
              <div class="card-body p-4">
              <div class="text-center">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">
                      <strong>precio:</strong> ${precio}
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
  }
  )
  .catch(err => console.log(err));
}
  renderizarHtml() */

/*  const renderizar = async () => {
    const result = await fetch( "http://localhost:3000/bbdd");
    const data = await result.json();
    let tiendaAdicta = document.getElementById("tiendaAdicta");
    data.map((item, i) => {
      tiendaAdicta.innerHTML += `
      <div class="col-md-4 my-5">
          <div class="card h-100">
          <img class="card-img-top img-fluid" src="images/${item.imagen}" alt="..." />
              <div class="card-body p-4">
              <div class="text-center">
                  <h5 class="card-title">${item.nombre}</h5>
                  <p class="card-text">
                      <strong>precio:</strong> ${item.precio} 
                      </p>
                      </div>
                      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-5">
                      <div class="text-center"><button class="btn btn-outline-dark mt-auto mensajeComprar" onclick="agregarAlCarrito(${i})" id="${item.id}" >Agregar al carrito</button></div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      `;
                      console.log(data);
                      console.log(i);
                      }
                      )
                      }
                     
                        renderizar();




// Language: javascript
// Path: js\carrito.js
 function renderizarHtml() {
  const renderizar = async () => {
    const result = await fetch( "BBDD/bbdd.json");
    const data = await result.json();
  
    let tiendaAdicta = document.getElementById("tiendaAdicta");
    data.array.forEach(item => {
      tiendaAdicta.innerHTML += `
      <div class="col-md-4 my-5">
          <div class="card h-100">
          <img class="card-img-top img-fluid" src="images/${item.imagen}" alt="${item.nombre, item.id + 1}" />
              <div class="card-body p-4">
              <div class="text-center">
                  <h5 class="card-title">${item.nombre}</h5>
                  <p class="card-text"> 
                      <strong>precio:</strong> ${item.precio}
                  </p>
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-5">
        <div class="text-center"><button class="btn btn-outline-dark mt-auto mensajeComprar" onclick="agregarAlCarrito(${i})" id="${item.id}" >Agregar al carrito</button></div>  
        </div>
        </div>
        </div>
        </div>
        `;
      
    });
      
  }
}
renderizarHtml();
renderizar()

 */


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



