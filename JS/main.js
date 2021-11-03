//JS para ver los productos de la tienda y el carrito de compras

let carrito = [];
let precio = 0;

//llamada a stock de productos en un archivo .JSON
const URLJSON = "JS/stock.json";

$("#contenedor-carrito").empty();

//creacion del Grid de productos - se muestran de acuerdo a la categoria elegida en la funcion mostrarPorCategoria

function mostrarProductos(cat) {
  $("#contenedor-productos").empty();

  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let miStock = respuesta;
      if (cat === "todos") {
        //grid de todos los productos
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

          //Boton que agrega los productos al carrito
          $(`#boton${producto.id}`).click(() => {
            agregarAlCarrito(producto.id);
            $(`#card${producto.id}`).fadeOut(500).fadeIn(500);
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
      } else {
        //Grid segun cada categoria
        let categoria = miStock.filter((elemento) => elemento.categoria == cat);
        for (const producto of categoria) {
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

          //Boton que agrega los productos al carrito
          $(`#boton${producto.id}`).click(() => {
            agregarAlCarrito(producto.id);
            $(`#card${producto.id}`).fadeOut(500).fadeIn(500);
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
    }
  });
}

//Al tocar los botones de las categorias  cambia la tabla de productos mostrando solo la categoria elegida
function mostrarPorCategoria() {
  //Botones de cada categoria
  $("#categorias").css({ display: "flex", "justify-content": "center", "flex-wrap":"wrap" })
                  .append(`<button id="todos" type="button" class="btn btn-secondary botonCategoria"><b>Todos</b></button>
                           <button id="cerveza" type="button" class="btn btn-secondary botonCategoria"><b>Cervezas</b></button>
                           <button id="vino" type="button" class="btn btn-secondary botonCategoria"><b>Vino</b></button>
                           <button id="bebidaBlanca" type="button" class="btn btn-secondary botonCategoria"><b>Bebidas blancas</b></button>
                           <button id="aperitivo" type="button" class="btn btn-secondary botonCategoria"><b>Aperitivos</b></button>
                           <button id="sinAlcohol" type="button" class="btn btn-secondary botonCategoria"><b>Sin alcohol</b></button>
                           <button id="otros" type="button" class="btn btn-secondary botonCategoria"><b>Otros</b></button>`);

  $("#todos").click(() => {
    mostrarProductos("todos");
    $(".botonCategoria").prop("disabled", false);
    $("#todos").prop("disabled", true);
  });

  $("#cerveza").click(() => {
    mostrarProductos("cerveza");
    $(".botonCategoria").prop("disabled", false);
    $("#cerveza").prop("disabled", true);
  });

  $("#vino").click(() => {
    mostrarProductos("vino");
    $(".botonCategoria").prop("disabled", false);
    $("#vino").prop("disabled", true);
  });

  $("#bebidaBlanca").click(() => {
    mostrarProductos("bebida blanca");
    $(".botonCategoria").prop("disabled", false);
    $("#bebidaBlanca").prop("disabled", true);
  });

  $("#aperitivo").click(() => {
    mostrarProductos("aperitivo");
    $(".botonCategoria").prop("disabled", false);
    $("#aperitivo").prop("disabled", true);
  });

  $("#sinAlcohol").click(() => {
    mostrarProductos("sin alcohol");
    $(".botonCategoria").prop("disabled", false);
    $("#sinAlcohol").prop("disabled", true);
  });

  $("#otros").click(() => {
    mostrarProductos("otros");
    $(".botonCategoria").prop("disabled", false);
    $("#otros").prop("disabled", true);
  });
  obtenerLocalStorage();
}

//funcion para agregar productos al carrito y a la tabla de carrito
function agregarAlCarrito(id) {
  let repetido = carrito.find((produ) => produ.id == id);

  if (repetido) {
    //Condicion cuando el producto ya esta en el carrito, no se agrega un nuevo objeto, solo se suma la cantidad
    repetido.cantidad = repetido.cantidad + 1;
    $(`#cantidad${repetido.id}`).empty();
    $(`#precio${repetido.id}`).empty();
    $(`#cantidad${repetido.id}`).append(`${repetido.cantidad}`);
    $(`#precio${repetido.id}`).append(`<td id="produc${repetido.id}">$${repetido.cantidad * repetido.precio}</td>`);

    actualizarProductos();
  } else {
    //Condicion cuando se agrega el producto al carrito por primera vez
    $.getJSON(URLJSON, function (respuesta, estado) {
      if (estado === "success") {
        let stock = respuesta;
        let productoAgregar = stock.find((producto) => producto.id == id);

        productoAgregar.cantidad = 1;

        carrito.push(productoAgregar);

        //Se agrega en la tabla de productos la fila del nuevo producto ingresado
        $("#contenedor-carrito").append(`<tr id="tr${productoAgregar.id}">
                                           <th scope="row"></th>
                                           <td>${productoAgregar.nombre}</td>
                                           <td ><button id="sumar${productoAgregar.id}"  type="button" class="btn btn-success"><b> + </b></button>
                                           <b id="cantidad${productoAgregar.id}" class="cantProducto">${productoAgregar.cantidad}</b></td>
                                           <button  id="restar${productoAgregar.id}" type="button" class="btn btn-info"><b> - </b></button></td>
                                          <td id="precio${productoAgregar.id}">$${productoAgregar.precio}</td>
                                           <td id="eliminar${productoAgregar.id}"><img type="button" class="trash" src="IMG/trash.svg"></td>
                                        </tr>`);

        actualizarProductos();


        //"boton eliminar" elimina todas las unidades del producto del carrito
        $(`#eliminar${productoAgregar.id}`).click(function(){
          carrito = carrito.filter(productoEliminar => productoEliminar.id != productoAgregar.id)
          $(`#tr${productoAgregar.id}`).css("background-color", "rgb(248, 157, 171)" )
                                       .fadeOut(500)
                                       
          actualizarProductos();

          Toastify({
            text: "Producto eliminado",
            className: "info",
            position: "center",
            style: { background: "linear-gradient(to right, red, orange)" },
          }).showToast();
        })

        //boton que suma una unidad del producto al carrito
        $(`#sumar${productoAgregar.id}`).click(function () {
          agregarAlCarrito(productoAgregar.id);

          Toastify({
            text: "Producto agregado",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        });

        //boton que resta una unidad del producto al carrito
        $(`#restar${productoAgregar.id}`).click(function () {
          let restarUnidad = carrito.find((produ) => produ.id == id);
          restarUnidad.cantidad = restarUnidad.cantidad - 1;

          //si no quedan mas de ese producto cumple la misma funcion que el "boton eliminar"
          if (restarUnidad.cantidad === 0) {
            $(`#eliminar${productoAgregar.id}`).trigger("click")

          } else {
            //Si todavia quedan unidades de ese producto en el carrito solo se disminuye la cantidad en el carrito y en la tabla
            $(`#cantidad${restarUnidad.id}`).empty();
            $(`#precio${restarUnidad.id}`).empty();
            $(`#cantidad${restarUnidad.id}`).append(`${restarUnidad.cantidad}`);
            $(`#produc${restarUnidad.id}`).append(`<td id="produc${restarUnidad.id}">$${restarUnidad.cantidad * restarUnidad.precio}</td>`);

            actualizarProductos();

            Toastify({
            text: "Producto eliminado",
            className: "info",
            position: "center",
            style: { background: "linear-gradient(to right, red, orange)" },
          }).showToast();
          }


        });
      }
    });
  }
}

// funcion para mostrar el precio y la cantidad total de productos en el carrito tanto en la tabla como en el HEADER

function actualizarProductos() {
  precio = 0;
  cantidad = 0;
  $("#vaciar").empty();
  $("#total").empty();
  $("#finalizarCompra").empty();

  //Si el carrito esta vacio la tabla de carrito se vacia
  if (carrito.length === 0) {
    $("#vaciar").append(`<b>CARRITO VACIO</b>`);
    $(".contador_carrito").text("Carrito");
    $("#cantTotal").empty();
    $("#precioFinal").empty();
    $("#total").empty();
  } else {
    //Si hay productos en el carrito aparecen los botones "vaciar" y "finalizar compra"
    $("#total").empty();
    $("#total").append(`<b>TOTAL</b>`);
    $("#vaciar").append(`<button id="vaciarCarrito" type="button" class="btn btn-secondary"><b>Vaciar carrito</b></button>`);
    $("#finalizarCompra").append(`<button id="botonFinalizar" type="button" class="btn btn-secondary"><b>Finalizar compra</b></button>`);
    $(".contador_carrito").text("Carrito (" + carrito.reduce((acc, el) => acc + el.cantidad, 0) + ")");

    for (let i = 0; i < carrito.length; i++) {
      //precio y cantidad totales del carrito
      precio += carrito[i].precio * carrito[i].cantidad;
      cantidad += carrito[i].cantidad;
    }
    $("#cantTotal").text(cantidad + " unidades");
    $("#precioFinal").text("$" + precio);

    $("#vaciarCarrito").click(() => {
        carrito = [];
      $("#contenedor-carrito").empty();
      actualizarProductos();

      Toastify({
        text: "CARRITO VACIO",
        className: "info",
        position: "center",
        style: { background: "linear-gradient(to right, blue, grey)" },
      }).showToast();
    });

    $("#botonFinalizar").click(() => {
      $("#titulo_carrito").empty();
      $("#titulo_carrito").append(`<h2>FINALIZAR COMPRA</h2>`);
      $(".table-carrito").hide();
      formularioDeCompra();
    });
  }
  guardarLocalStorage();
}

//Llamada de funcion visualizar el grid de productos
mostrarPorCategoria();