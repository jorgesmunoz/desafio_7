const express = require("express");
const routerProducto = express.Router();

const {
  getProductos,
  getProductosId,
  postProducto,
  putProducto,
  deleteProducto,
} = require("../src/controllers/productos.js");

routerProducto.get("/", getProductos);
routerProducto.get("/:id", getProductosId);
routerProducto.post("/", postProducto);
routerProducto.put("/:id", putProducto);
routerProducto.delete("/:id", deleteProducto);

module.exports = routerProducto;
