const express = require("express");
const router = express.Router();
const PerritoController = require("../controllers/perrito.controller"); //Creamos el controlador de la estructura con la que vamos a trabajar, en este ejemplo PerritoController

//Aca vamos a ir agregando las diferentes rutas, si son GET, POST, PUT, DELETE, etc., el nombre de la ruta y por ultimo la funcion relacionada (estan en controllers)
router.get("/traerUno", PerritoController.traerUnPerrito);
router.post("/insertar", PerritoController.insertarPerrito);
router.put("/modificar", PerritoController.modificarPerrito);
router.delete("/eliminar", PerritoController.eliminarPerrito);

module.exports = router;