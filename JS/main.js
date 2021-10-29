let carrito = [];
let precio = 0;

//llamada a stock de productos en un archivo .JSON
const URLJSON = "JS/stock.json";

$("#contenedor-carrito").empty();

//creacion del Grid de productos

function mostrarProductos(cat) {
  $("#contenedor-productos").empty();

  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let miStock = respuesta;
      if (cat === "Todos") { 
        for (const producto of miStock) {
        $("#contenedor-productos").append(`<div class="col"> 
                                          <div id="card${producto.id}"  class="card">
                                               <img src=${producto.img} class=" imgProducto card-img-top" alt=${producto.alt}>
                                               <div  class="card-body">
                                                  <h5 class="card-title">${producto.nombre}</h5>
                                                  <p class="card-text">${producto.descripcion}</p>
                                                  <p>$${producto.precio}</p>
                                                  <button id="boton${producto.id}"type="button" class="btn btn-primary">Agregar al carrito</button>

                                                </div>
                                          </div>
                                      </div>`);
                                      $(`#boton${producto.id}`).click( () => {
                                        agregarAlCarrito(producto.id);
                                        $(`#card${producto.id}`)
                                          .fadeOut(500)
                                          .fadeIn(500)
                                          //.css("border", "0.3rem solid rgb(248, 157, 171)");
                              
                                        // $(`#boton${producto.id}`).css({
                                        //   "background-color": "rgb(241, 159, 198)",
                                        //   color: "black",
                                        // });
                                        Toastify({
                                          text: "Producto agregado",
                                          className: "info",
                                          position: "center",
                                          style: {
                                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                                          },
                                        }).showToast();
                                      });

      }
    }
      else {
      //cambiar nombre de viarable category. ver q esa catergoria este determinada por los botones de id="categorias"
      let category = miStock.filter(elemento =>( elemento.categoria == cat))
      
      for (const producto of category) {
        $("#contenedor-productos").append(`<div class="col"> 
                                          <div id="card${producto.id}"  class="card">
                                               <img src=${producto.img} class=" imgProducto card-img-top" alt=${producto.alt}>
                                               <div  class="card-body">
                                                  <h5 class="card-title">${producto.nombre}</h5>
                                                  <p class="card-text">${producto.descripcion}</p>
                                                  <p>$${producto.precio}</p>
                                                  <button id="boton${producto.id}"type="button" class="btn btn-primary">Agregar al carrito</button>

                                                </div>
                                          </div>
                                      </div>`);
      $(`#boton${producto.id}`).click( () => {
          agregarAlCarrito(producto.id);
          $(`#card${producto.id}`)
            .fadeOut(500)
            .fadeIn(500)
            //.css("border", "0.3rem solid rgb(248, 157, 171)");

          // $(`#boton${producto.id}`).css({
          //   "background-color": "rgb(241, 159, 198)",
          //   color: "black",
          // });
          Toastify({
            text: "Producto agregado",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        });}
        
      }
      
    }
  }
  );

}
//ESTO LO DEBEN HACER LOS BOTONES, CADA BOTON DE CATEGORIA LLEVA A UN MostrarProductos diferente


//funcion para agregar productos al carrito y a la tabla de carrito
function agregarAlCarrito(id) {
  let repetido = carrito.find((produ) => produ.id == id);

  if (repetido) {
    repetido.cantidad = repetido.cantidad + 1;
    $(`#cantidad${repetido.id}`).empty();
    $(`#produc${repetido.id}`).empty();
    $(`#cantidad${repetido.id}`).append(` <td id="cantidad${repetido.id}">${repetido.cantidad}</td>`);
    $(`#produc${repetido.id}`).append(`<td id="produc${repetido.id}">$${repetido.cantidad * repetido.precio}</td>`);

    actualizarProductos();
  } else {
    $.getJSON(URLJSON, function (respuesta, estado) {
      if (estado === "success") {
        let stock = respuesta;

        let productoAgregar = stock.find((producto) => producto.id == id);
        carrito.push(productoAgregar);


        productoAgregar.cantidad = 1;
        $("#contenedor-carrito").append(`<tr id="tr${productoAgregar.id}">
                                        <th scope="row"></th>
                                        <td>${productoAgregar.nombre}</td>
                                        <td id="cantidad${productoAgregar.id}">${productoAgregar.cantidad}</td>
                                        <td><button id="sumar${productoAgregar.id}"  type="button" class="btn btn-success"><b> + </b></button>
                                        <button  id="restar${productoAgregar.id}" type="button" class="btn btn-info"><b> - </b></button></td>
                                        <td id="produc${productoAgregar.id}">$${productoAgregar.precio}</td>
                                           
                                    </tr>`);

        actualizarProductos();
      //botones que suman o restan una unidad del producto
      $(`#sumar${productoAgregar.id}`).click(function(){
        agregarAlCarrito(id);

        Toastify({
          text: "Producto agregado",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        } )

        $(`#restar${productoAgregar.id}`).click(function() {
         let restarUnidad = carrito.find((produ) => produ.id == id)
         restarUnidad.cantidad = restarUnidad.cantidad - 1;
         
          if (restarUnidad.cantidad === 0){
          $("tr").remove(`#tr${productoAgregar.id}`);
          carrito = carrito.filter((prodE) => prodE.id != productoAgregar.id);
          actualizarProductos();
         
          $(`#card${productoAgregar.id}`)
             .css("border", "1px solid rgba(0,0,0,.125)");
          $(`#boton${productoAgregar.id}`).css({
            "background-color": "#d4374f",
            color: "#fff",
          })

         } else {

         $(`#cantidad${restarUnidad.id}`).empty();
         $(`#produc${restarUnidad.id}`).empty();
         $(`#cantidad${restarUnidad.id}`).append(` <td id="cantidad${restarUnidad.id}">${restarUnidad.cantidad}</td>`);
         $(`#produc${restarUnidad.id}`).append(`<td id="produc${restarUnidad.id}">$${restarUnidad.cantidad * restarUnidad.precio}</td>`);
     
         actualizarProductos();
         }
         Toastify({
          text: "Producto eliminado",
          className: "info",
          position: "center",
          style: { background: "linear-gradient(to right, red, orange)" },
        }).showToast();
        
         

        })

      
      }
    });
  }
}

// funcion para mostrar el precio y la cantidad total de productos en el carrito tanto en la tabla como en el HEADER

function actualizarProductos() {
  precio = 0;
  cantidad = 0;
  $("#vaciar").empty()
  $("#total").empty()
  

  if (carrito.length === 0) {
    $("#vaciar").append(`<b>CARRITO VACIO</b>`);
    $(".contador_carrito").text("Carrito");
    $("#cantTotal").empty();
    $("#precioFinal").empty();
    $("#total").empty();
  }
  else {
    $("#total").empty()
    $("#total").append(`<b>TOTAL</b>`)
    $("#vaciar").append(`<button id="vaciarCarrito" type="button" class="btn btn-secondary"><b>Vaciar carrito</b></button>`)
    $(".contador_carrito").text(
    "Carrito (" + carrito.reduce((acc, el) => acc + el.cantidad, 0) + ")"
  );
  for (let i = 0; i < carrito.length; i++) {
    precio += carrito[i].precio * carrito[i].cantidad;
    cantidad += carrito[i].cantidad;
 

  }
  $("#cantTotal").text(cantidad + " unidades");
  $("#precioFinal").text("$" + precio);
  
  $("#vaciarCarrito").click( ()=>{
    carrito = [];
    
      $("#contenedor-carrito").empty();
      $(`.card`).css("border", "1px solid rgba(0,0,0,.125)");
       $(`.btn-primary`).css({"background-color": "#d4374f",
                                  color: "#fff" })
      actualizarProductos()

      Toastify({
        text: "CARRITO VACIO",
        className: "info",
        position: "center",
        style: { background: "linear-gradient(to right, blue, grey)" },
      }).showToast();
    })

  }
  guardarLocalStorage();
}

//Guarda los elementos del carrito en LocalStorage
function guardarLocalStorage() {
  localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
}

//Obtencion de los elementos del carrito previamente guardados en local Storage
function obtenerLocalStorage() {
  mostrarProductos("Todos");
  let carritoActualizado = JSON.parse(localStorage.getItem("carritoGuardado"));

  if (carritoActualizado) {
    carritoActualizado.forEach((el) => {
      carrito.push(el);
      actualizarProductos();
      $("#contenedor-carrito").append(`<tr id="tr${el.id}">
      <th scope="row"></th>
      <td>${el.nombre}</td>
      <td id="cantidad${el.id}">${el.cantidad}</td>
      <td><button id="sumar${el.id}" type="button" class="btn btn-success"><b> + </b></button>
      <button id="restar${el.id}" type="button" class="btn btn-info"><b> - </b></button></td>
      <td id="produc${el.id}">$${el.precio * el.cantidad}</td>
         
             </tr>`);

            
              
        
      //botones que suman o restan una unidad del producto
      $(`#sumar${el.id}`).click(function(){
        agregarAlCarrito(el.id);
        Toastify({
          text: "Producto agregado",
          className: "info",
          position: "center",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        } )
  
        $(`#restar${el.id}`).click(function() {
          let restarU = carrito.find((produ) => produ.id == el.id)
          restarU.cantidad = restarU.cantidad - 1;
          if (restarU.cantidad === 0){
           $("tr").remove(`#tr${el.id}`);
           carrito = carrito.filter((prodE) => prodE.id != el.id);
           actualizarProductos();

           Toastify({
            text: "Producto eliminado",
            className: "info",
            position: "center",
            style: { background: "linear-gradient(to right, red, orange)" },
          }).showToast();

          $(`#card${el.id}`).css("border", "1px solid rgba(0,0,0,.125)");
          $(`#boton${el.id}`).css({
            "background-color": "#d4374f",
            color: "#fff",
          })
 
          } else {
           
          $(`#cantidad${restarU.id}`).empty();
          $(`#produc${restarU.id}`).empty();
          $(`#cantidad${restarU.id}`).append(` <td id="cantidad${restarU.id}">${restarU.cantidad}</td>`);
          $(`#produc${restarU.id}`).append(`<td id="produc${restarU.id}">$${restarU.cantidad * restarU.precio}</td>`);

      
          actualizarProductos();
         
          Toastify({
            text: "Producto eliminado",
            className: "info",
            position: "center",
            style: { background: "linear-gradient(to right, red, orange)" },
          }).showToast();
          }
          
         })

        
        //  $(`#boton${el.id}`).css({
        //   "background-color": "rgb(241, 159, 198)",
        //   color: "black",
        // });
  
        // $(`#card${el.id}`).css("border", "0.3rem solid rgb(248, 157, 171)");
      

      
    });
  }

 
}

function mostrarPorCategoria(){
$("#categorias").css({"display":"flex",
                      "justify-content":"center"})
                .append(`<button id="todos" type="button" class="btn btn-secondary"><b>Todos</b></button>
                <button id="cerveza" type="button" class="btn btn-secondary"><b>Cervezas</b></button>
                <button id="vino" type="button" class="btn btn-secondary"><b>Vino</b></button>
                <button id="bebidaBlanca" type="button" class="btn btn-secondary"><b>Bebidas blancas</b></button>
                <button id="aperitivo" type="button" class="btn btn-secondary"><b>Aperitivos</b></button>
                <button id="sinAlcohol" type="button" class="btn btn-secondary"><b>Sin alcohol</b></button>
                <button id="otros" type="button" class="btn btn-secondary"><b>Otros</b></button>`)


  $("#todos").click(()=> {
    mostrarProductos("Todos")
    $("#todos").prop("disabled", true)
    $("#cerveza").prop("disabled",false)
    $("#vino").prop("disabled",false)
    $("#bebidaBlanca").prop("disabled",false)
    $("#aperitivo").prop("disabled",false)
    $("#sinAlcohol").prop("disabled",false)
    $("#otros").prop("disabled",false)

  })

  $("#cerveza").click(()=>{
 mostrarProductos("Cerveza")
 $("#todos").prop("disabled", false)
    $("#cerveza").prop("disabled",true)
    $("#vino").prop("disabled",false)
    $("#bebidaBlanca").prop("disabled",false)
    $("#aperitivo").prop("disabled",false)
    $("#sinAlcohol").prop("disabled",false)
    $("#otros").prop("disabled",false)

  })

  $("#vino").click(()=>{
    mostrarProductos("Vino")
    $("#todos").prop("disabled", false)
       $("#cerveza").prop("disabled",false)
       $("#vino").prop("disabled",true)
       $("#bebidaBlanca").prop("disabled",false)
       $("#aperitivo").prop("disabled",false)
       $("#sinAlcohol").prop("disabled",false)
       $("#otros").prop("disabled",false)
   
     })

     $("#bebidaBlanca").click(()=>{
      mostrarProductos("Bebida blanca")
      $("#todos").prop("disabled", false)
         $("#cerveza").prop("disabled",false)
         $("#vino").prop("disabled",false)
         $("#bebidaBlanca").prop("disabled", true)
         $("#aperitivo").prop("disabled",false)
         $("#sinAlcohol").prop("disabled",false)
         $("#otros").prop("disabled",false)
     
       })

       $("#aperitivo").click(()=>{
        mostrarProductos("Aperitivo")
        $("#todos").prop("disabled", false)
           $("#cerveza").prop("disabled",false)
           $("#vino").prop("disabled",false)
           $("#bebidaBlanca").prop("disabled", false)
           $("#aperitivo").prop("disabled", true)
           $("#sinAlcohol").prop("disabled",false)
           $("#otros").prop("disabled",false)
       })

       $("#sinAlcohol").click(()=>{
        mostrarProductos("Sin alcohol")
        $("#todos").prop("disabled", false)
           $("#cerveza").prop("disabled",false)
           $("#vino").prop("disabled",false)
           $("#bebidaBlanca").prop("disabled", false)
           $("#aperitivo").prop("disabled", false)
           $("#sinAlcohol").prop("disabled",true)
           $("#otros").prop("disabled",false)
       })

       $("#otros").click(()=>{
        mostrarProductos("Otros")
        $("#todos").prop("disabled", false)
           $("#cerveza").prop("disabled",false)
           $("#vino").prop("disabled",false)
           $("#bebidaBlanca").prop("disabled", false)
           $("#aperitivo").prop("disabled", false)
           $("#sinAlcohol").prop("disabled",false)
           $("#otros").prop("disabled",true)
       })
  obtenerLocalStorage();
}

mostrarPorCategoria()

