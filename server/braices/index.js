var express = require ('express'),
    router = express.Router(),
    path = require ('path'),
    Storage = require ('../storage/index.js')

router.get('/consulta',function(req,res){
  //res.send("Hola");
  Storage.consultar()
          .then((data) => {
            res.json({"datos":data});
          })
          .catch((err) => {
            res.json({"datos": err });
          });
});

router.get('/filtros',function(req,res){
  let filtros = {ciudades: [], tipos: []};
  //let ciudades;
  //let tipos;
  Storage.consultar()
          .then((data) => {
            data.forEach((key,idx) => {
              if(!filtros.ciudades.includes(key.Ciudad)){
                filtros.ciudades.push(key.Ciudad);
              };
              if(!filtros.tipos.includes(key.Tipo)){
                filtros.tipos.push(key.Tipo);
              }
              /*if (!filtros.ciudades.includes(key.Ciudad)){
                filtros.ciudades.push(key.Ciudad);
              }
              if (!filtros.tipos.includes(key.Tipo)){
                filtros.tipos.push(key.Tipo);
              }*/
            });
            res.json({"filtros":filtros});
          })
          .catch((err) => {
            res.json({"filtros": err });
          });
});
/*router.post('/',function(req,res){
  res.sendFile(path.join(__dirname,'../public','index.html'))
})*/

module.exports = router
