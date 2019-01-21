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
          console.log(data);
        }
      })
  },
  imprimir : function (){
    console.log(this.apiURL);
  }
};

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
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
