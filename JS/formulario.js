//JS para obtener el formulario de finalizacion de compra 

//funcion que inicia el formulario para finalizar la compra

function formularioDeCompra() {
    $("#formulario").append(`<form class="form"><button id="botonCerrar" class="btn btn-primary" >X</button>
                                                <div class="row">
                                                    <input placeholder="Nombre completo" id="nombre" type="text" class="validate">
                                                </div>
                                                <div class="row">
                                                    <input  id="dirección" type="text" class="validate" placeholder="Direccion">
                                                </div>
                                                <div class="row">
                                                    <input id="localidad" type="text" class="validate" placeholder="Localidad">
                                                </div>
                                                <div class="row">
                                                    <input id="email" type="email" class="validate" placeholder="Email">
                                                </div>
                                                <div><b>Valor total de su compra es $${precio}</b>
                                                </div>
                                                <div><input class="btn btn-primary" type="submit" id="submit" value="Finalizar compra">
                                                </div>
                                         </form>`);
  
  //Funcionalidad de boton de "Finalizar compra" en el formulario
   $("#submit").click(function (e) {
        e.preventDefault(); 
        
        //Si se completaron todos los campos del formulario la compra finaliza y se vacia el carrito y la tabla del carrito
        if (($("#nombre").val() !="")  && ($("#direccion").val() !="" ) && ($("#localidad").val() !="" )&& ($("#email").val() !="" )){
            Toastify({
              text: "COMPRA REALIZADA CON EXITO",
              className: "info",
              position: "center",
              style: { background: "linear-gradient(to right,#FFC300, #FF5733, #C70039, #900C3F)" },
            }).showToast();
  
            carrito = [];
            $("#contenedor-carrito").empty()
            $("#botonCerrar").trigger("click")
           actualizarProductos()
          } else {
            //Si hay campos del formulario incompletos si indican los que faltan y no finaliza la compra
               let inputs = $("#formulario").find(':input')
               inputs.each(function(index,elemento) {
                  if($(elemento).val().length <= 0){
                    $(elemento).css("border", "solid 3px #FA5858")
                     }else{
                       $(elemento).css('border', 'none')
                      }
                })
               }  
      })
  
      //Funcionalidad del "boton cerrar" del formulario. Se vuelve a la tabla del carrito 
     $("#botonCerrar").click(() => {
      $("#formulario").hide();
      $("#titulo_carrito").empty();
      $("#titulo_carrito").append(`<h2>Carrito de compras</h2>`);
      $(".table-carrito").show();
    });
  }
  
  