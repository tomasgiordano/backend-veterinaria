const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, MONGO_DB_NAME } = require('../config/db.config');

const state = {
  db: null
};

//Metodo de conexion con MongoClient
exports.connect = (done) => {
  if (state.db) return done();

  MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return done(err);

    //Guardamos el nombre de la base de datos
    let dbName = MONGO_DB_NAME;

    //Guardamos la base de datos en la variable state.db, de esta manera podemos retornar esa variable con get()
    state.db = client.db(dbName);
    done();
  });
};

//Obtenemos el objeto base de datos
exports.getInstance = () => {
  return state.db;
};

//Cerramos la conexion
exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};