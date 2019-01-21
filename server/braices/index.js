var express = require ('express'),
    router = express.Router(),
    path = require ('path'),
    Storage = require ('../storage/index.js')

router.get('/consulta',function(req,res){
  res.send("Hola");
})

/*router.post('/',function(req,res){
  res.sendFile(path.join(__dirname,'../public','index.html'))
})*/

module.exports = router
