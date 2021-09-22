const db = require("../models/db");

//Esta es la estructura normal de un documento perrito en la coleccion perritos. Hardcodeamos un objeto perrito para probar las consultas basicas
let perrito = {
   idPerrito: 1000,
   nombre: "Lobo",
   raza: "Sharpei",
   color: "negro",
   peso: 17,
   apodos: ["Lobito bebé", "Lolo", "Lobi"],
   obediencia: [
      {
         accion: "dar la pata",
         nivel: "excelente"
      },
      {
         accion: "quieto",
         nivel: "intermedio"
      },
      {
         accion: "besito",
         nivel: "increible"
      }
   ],
   duenio: {
      nombre: "Lucia",
      edad: 22,
      telefono: 1144859987
   }
};

/**
 * Utilizamos las mismas sentencias que cuando trabajamos en la consola de mongo: aggregate, find, insertOne, updateOne, deleteOne, etc.
 * Las primeras consultas corresponden a consultas con datos hardcodeados, las versiones genericas donde se reciben parametros por request.body estan mas abajo y comentadas (las pueden testear con Postman)
 * Hicimos esto a fin de que se entienda como esta estructurada la api, los primeros pasos por asi decir
*/

//Traer un perrito
exports.traerUnPerrito = (req, res) => {
   db.getInstance().collection("perritos").aggregate([
      {
         $project: { //Mostramos solo nombre, raza y nombre del dueño de un perrito con $project
            perrito: {
               nombre: "$nombre",
               raza: "$raza",
               duenio: "$duenio.nombre"
            }
         }
      },
      {
         $limit: 1 //Que solo nos traiga un documento
      }
   ]).toArray() //Importante! Aggregate devuelve array, sino no podremos usar then y catch
   .then((data) => {
      res.status(200).send( //Si todo salio bien, respondo codigo 200 y un mensaje de exito + el perrito encontrado
         {
            exito: "Perrito traido correctamente!", 
            perrito: data
         }
      );
   })
   .catch((err) => { //Si todo sale mal, respondo codigo 500 y un mensaje de error
      res.status(500).send(
         {
            error: "Ocurrio un error al traer documento",
            resMongoDB: err
         }
      ); 
   });
};

//Insertar un perrito (hardcodeado)
exports.insertarPerrito = (req, res) => {
   db.getInstance().collection("perritos").insertOne(perrito) //Inserto el objeto perrito hardcodeado
   .then((data) => { //Si todo salio bien, respondo codigo 200 y un mensaje de exito + el perrito insertado. Tambien es posible que de 200, pero que no se haya insertado nada, para eso se muestra el data
      res.status(200).send(
         {
            exito: "Perrito insertado correctamente!", 
            perrito: JSON.stringify(perrito),
            resMongoDB: data
         }
      );
   })
   .catch((err) => { //Si todo sale mal, respondo codigo 500 y un mensaje de error
      res.status(500).send(
         {
            error: "Ocurrio un error al insertar documento",
            resMongoDB: err
         }
      ); 
   });
};

//Modificar un perrito (hardcodeado)
exports.modificarPerrito = (req, res) => {
   db.getInstance().collection("perritos").updateOne(
      {
         idPerrito: 1000 //Voy a modificar al perrito que cumple con que su campo idPerrito sea 1000
      }, 
      {
         $set: { //Con $set modificamos los campos nombre y duenio.nombre
            nombre: "Lola",
            "duenio.nombre": "Alan"
         }
      }
   )
   .then((data) => { //Si todo salio bien, respondo codigo 200 y un mensaje exito. Tambien es posible que de 200, pero que no se haya modificado nada, para eso se muestra el data
      res.status(200).send(
         {
            exito: "Perrito modificado correctamente!",
            resMongoDB: data
         }
      );
   })
   .catch((err) => { //Si todo sale mal, respondo codigo 500 y un mensaje de error
      res.status(500).send(
         {
            error: "Ocurrio un error al modificar documento",
            resMongoDB: err
         }
      );
   });
};

//Eliminar un perrito (hardcodeado)
exports.eliminarPerrito = (req, res) => {
   db.getInstance().collection("perritos").deleteOne(
      {
         idPerrito: 1000 //Voy a eliminar al perrito que cumple con que su campo idPerrito sea 1000
      }
   )
   .then((data) => { //Si todo salio bien, respondo codigo 200 y un mensaje exito. Tambien es posible que de 200, pero que no se haya eliminado nada, para eso se muestra el data
      res.status(200).send(
         {
            exito: "Perrito eliminado correctamente!",
            resMongoDB: data
         }
      );
   })
   .catch((err) => { //Si todo sale mal, respondo codigo 500 y un mensaje de error
      res.status(500).send(
         {
            error: "Ocurrio un error al eliminar documento",
            resMongoDB: err
         }
      );
   });
};

//Insertar un perrito (pasando un json por parametro en el body de la peticion)
/*exports.insertarPerrito = (req, res) => {
   if(!req.body.perrito) //Si el parametro 'perrito' no existe, tiro error
   {
      res.status(400).send(
         {
            error: "Falta parametro 'perrito'!"
         }
      );
      return;
   }

   perrito = JSON.parse(req.body.perrito); //Guardo al perrito pasado por body de texto a objeto
   
   db.getInstance().collection("perritos").insertOne(perrito)
   .then((data) => {
      res.status(200).send( //Si todo salio bien, respondo codigo 200 y un mensaje de exito + el perrito insertado. Tambien es posible que de 200, pero que no se haya insertado nada, para eso se muestra el data
         {
            exito: "Perrito insertado correctamente!", 
            perrito: JSON.stringify(perrito),
            resMongoDB: data
         }
      );
   })
   .catch((err) => { //Si todo sale mal, respondo codigo 500 y un mensaje de error
      res.status(500).send(
         {
            error: "Ocurrio un error al insertar documento",
            resMongoDB: err
         }
      );
   });
};*/

//Modificar un perrito (pasando el id y un json con los campos a modificar como parametros por el body)
/*exports.modificarPerrito = (req, res) => {
   if(!req.body.id || !req.body.perrito)
   {
      res.status(400).send(
         {
            error: "Falta parametro 'id' o 'perrito'!"
         }
      );
      return;
   }
   db.getInstance().collection("perritos").updateOne(
      {
         idPerrito: parseInt(req.body.id)
      }, 
      {
         $set: JSON.parse(req.body.perrito)
      }
   )
   .then((data) => { //Si todo salio bien, respondo codigo 200 y un mensaje exito. Tambien es posible que de 200, pero que no se haya eliminado nada, para eso se muestra el data
      res.status(200).send(
         {
            exito: "Perrito modificado correctamente!",
            resMongoDB: data
         }
      );
   })
   .catch((err) => { //Si todo sale mal, respondo codigo 500 y un mensaje de error
      res.status(500).send(
         {
            error: "Ocurrio un error al modificar documento",
            resMongoDB: err
         }
      );
   });
};*/