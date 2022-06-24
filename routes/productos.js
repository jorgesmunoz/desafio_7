const express = require("express");
const router = express.Router();
const {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto,
} = require("../controllers/productos.js");

router.get("/:id?", getProductos);
router.post("/", postProducto);
router.put("/:id", putProducto);
router.delete("/:id", deleteProducto);

module.exports = router;
