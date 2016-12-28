var config = (function(){
    var name= 'pharm';
    var dbUrl = 'mongodb://localhost:27017/'+name;
    var config = {
        name: name,
        db: dbUrl
    }
    return config;
  })();

module.exports = config;
