var fs = require ('fs'),
    path = require ('path')

module.exports = {
  consultar: () => {
    dataPath = __dirname + path.join('/data.json');
    return new Promise(function(resolve, reject){
      fs.readFile(dataPath, 'utf8', function(err, readData){
        if(err) reject(err)
        resolve(JSON.parse(readData))
      })
    })
  }/*,
  filtros: () => {
    return new Promise(function(resolve, reject){
      fs.readFile(this.dataPath, 'utf8', function(err, readData){
        if(err) reject(err)
        resolve(JSON.parse(readData))
      })
    })
  }*/
}
