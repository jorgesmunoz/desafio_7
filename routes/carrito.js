const express = require("express");
const routerCarrito = express.Router();

const {
  postCarrito,
  deleteCarrito,
  getProductosCarrito,
  postProductoCarrito,
  deleteProductoCarrito,
} = require("../src/controllers/carrito.js");

routerCarrito.post("/", postCarrito);
routerCarrito.delete("/:id", deleteCarrito);
routerCarrito.get("/:id/productos", getProductosCarrito);
routerCarrito.post("/:id/productos/:id_prod", postProductoCarrito);
routerCarrito.delete("/:id/productos/:id_prod", deleteProductoCarrito);

module.exports = routerCarrito;
