//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
});

let app = { //peticion ajax todos los datos
  personalizado : true,
  apiURL : "/consulta",
  consulta : function  (){
      $.ajax({
        url: this.apiURL,
        type: 'get',
        success: function(data){
          $('.lista').html(render(data.datos));
        }
      })
  },
  imprimir : function (){
    console.log(this.apiURL);
  }
};

let filtros = { //peticion ajax solo datos para menus desplegables
  apiURL : "/filtros",
  consulta : function  (){
      $.ajax({
        url: this.apiURL,
        type: 'get',
        success: function(data){
          adjuntarFiltros(data.filtros);
        }
      })
  },
}

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
      filtros.consulta();
    }
    app.personalizado = this.customSearch;
    $('#personalizada').toggleClass('invisible')
  })
};

setSearch();

function buscar(){ //realizar la peticion http al servidor al presionar el boton de buscar
  let btnBuscar = $('#buscar');
  btnBuscar.click(function(){
    //console.log(app.apiURL);
    app.consulta();
  });
};

buscar();

function adjuntarFiltros(objArr){ // Adjuntar datos obtenidos a los menus desplegables
  var htmlc = '<option value="" selected>Escoge una ciudad</option>';
  var htmlt = '<option value="" selected>Escoge un tipo</option>';
  objArr.ciudades.forEach((key, idx)=>{
    htmlc += '<option value="'+idx+'">'+key+'</option>'
  })
  objArr.tipos.forEach((key, idx)=>{
    htmlt += '<option value="'+idx+'">'+key+'</option>'
  })
  $("#ciudad").html(htmlc);
  $("#tipo").html(htmlt);
  $('select').material_select();
};

function render(objArr) { //renderizar elementos
  var html = '';
  var ciudad = $("#ciudad option:selected").text();
  var tipo = $("#tipo option:selected").text();
  var valores = $("#rangoPrecio").val();
  valores = valores.split(";");
  //console.log(valores+"/"+ciudad);
  objArr.forEach(function(key, idx)
  {
    let precio = parseInt(key.Precio.replace("$", "").replace(",", ""));
    if ($("#checkPersonalizada")[0].checked){
      if((key.Ciudad == ciudad || ciudad == "Escoge una ciudad") && (key.Tipo==tipo || tipo == "Escoge un tipo") && precio>=valores[0] && precio<=valores[1]){
        html += template(key,idx);
      }
    }
    else {
      html += template(key,idx);
     }
   });
 return html;
}//fin render

function template (key,idx) { //Template usado para mostrar datos de las propiedades
  let html = `<div class="card horizontal">
            <div class="card-image">
              <img src="img/home.jpg">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
              </div>
             </div>
          </div>`;

  return html;
};
