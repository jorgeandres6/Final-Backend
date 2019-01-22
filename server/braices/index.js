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

/*router.post('/',function(req,res){
  res.sendFile(path.join(__dirname,'../public','index.html'))
})*/

module.exports = router
