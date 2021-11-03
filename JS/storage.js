//JS para obtener el carrito guardado en localStorage y volver a generar el mismo sitio al actualizar o volver a abrir

//Guarda los elementos del carrito en LocalStorage
function guardarLocalStorage() {
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
  }

//Obtencion de los elementos del carrito previamente guardados en local Storage
function obtenerLocalStorage() {
    mostrarProductos("todos");
    $("#todos").prop("disabled", true);
    let carritoActualizado = JSON.parse(localStorage.getItem("carritoGuardado"));
  
    if (carritoActualizado) {
      //Si hay productos en el carrito guardado en localStorage se agregan a la tabla del carrito y las cantidades al HEADER
      carritoActualizado.forEach((productoStorage) => {
        carrito.push(productoStorage);
        actualizarProductos();
         $("#contenedor-carrito").append(`<tr id="tr${productoStorage.id}">
                                            <th scope="row"></th>
                                            <td>${productoStorage.nombre}</td>
                                            <td ><button id="sumar${productoStorage.id}" type="button" class="btn btn-success"><b> + </b></button>
                                            <b id="cantidad${productoStorage.id}" class="cantProducto">${productoStorage.cantidad}</b><button id="restar${productoStorage.id}" type="button" class="btn btn-info"><b> - </b></button></td>
                                            <td id="precio${productoStorage.id}">$${productoStorage.precio * productoStorage.cantidad}</td>
                                            <td id="eliminar${productoStorage.id}"><img class="trash" type="button"src="IMG/trash.svg"></td>
                                          </tr>`);
  
  
        //"boton eliminar" elimina todas las unidades del producto del carrito
          $(`#eliminar${productoStorage.id}`).click(function(){
            carrito = carrito.filter(productoEliminar => productoEliminar.id != productoStorage.id)
            $(`#tr${productoStorage.id}`).css("background-color", "rgb(248, 157, 171)" )
                                          .fadeOut(500)
                                          
            actualizarProductos()
  
            Toastify({
              text: "Producto eliminado",
              className: "info",
              position: "center",
              style: { background: "linear-gradient(to right, red, orange)" },
            }).showToast();
           
          })
  
        //boton que suma una unidad del producto al carrito
        $(`#sumar${productoStorage.id}`).click(function () {
          agregarAlCarrito(productoStorage.id);
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
        $(`#restar${productoStorage.id}`).click(function () {
          let restarUno = carrito.find((produ) => produ.id == productoStorage.id);
          restarUno.cantidad = restarUno.cantidad - 1;
  
          //si no quedan mas de ese producto cumple la misma funcion que el "boton eliminar"
          if (restarUno.cantidad === 0) {
            $(`#eliminar${productoStorage.id}`).trigger("click")
            
          } else {
             //Si todavia quedan unidades de ese producto en el carrito solo se disminuye la cantidad en el carrito y en la tabla
            $(`#cantidad${restarUno.id}`).empty();
            $(`#precio${restarUno.id}`).empty();
            $(`#cantidad${restarUno.id}`).append(`${restarUno.cantidad}`);
            $(`#precio${restarUno.id}`).append(`<td id="precio${restarUno.id}">$${restarUno.cantidad * restarUno.precio}</td>`);
  
            actualizarProductos();
  
            Toastify({
              text: "Producto eliminado",
              className: "info",
              position: "center",
              style: { background: "linear-gradient(to right, red, orange)" },
            }).showToast();
          }
          
        });
      });
  
      if (carrito.length === 0){
        $("#vaciar").append(`<b>CARRITO VACIO</b>`);
      }
    }
    
  }
  