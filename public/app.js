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

let app = {
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

let filtros = {
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

function buscar(){
  let btnBuscar = $('#buscar');
  btnBuscar.click(function(){
    //console.log(app.apiURL);
    app.consulta();
  });
};

buscar();

function adjuntarFiltros(objArr){
  var htmlc = '';
  var htmlt = '';
  objArr.ciudades.forEach((key, idx)=>{
    htmlc += '<option value="'+idx+'">'+key+'</option>'
  })
  objArr.tipos.forEach((key, idx)=>{
    htmlt += '<option value="'+idx+'">'+key+'</option>'
  })
  $("#ciudad").append(htmlc);
  $("#tipo").append(htmlt);
  $('select').material_select();
};

function render(objArr) { //renderizar elementos
  var html = '';
  var ciudad = $("#ciudad").val();
  var tipo = $("#tipo").val();
  var valores = $("#rangoPrecio").val();
  valores = valores.split(";");
  //console.log(valores+"/"+ciudad);
  objArr.forEach(function(key, idx)
  {
    if ($("#checkPersonalizada")[0].checked){

    }
    else {
      html += `<div class="card horizontal">
                <div class="card-image">
                  <img src="http://localhost:3000/img/home.jpg">
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
     }
   });
 return html;
}//fin render
