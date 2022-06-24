const express = require("express");
const router = express.Router();
const {
  getCarrito,
  postCarrito,
  deleteCarrito,
  postProdCarrito,
  deleteProdCarrito,
} = require("../controllers/carrito.js");

router.post("/", postCarrito);
router.delete("/:id", deleteCarrito);
router.get("/:id/productos", getCarrito);
router.post("/:id/productos", postProdCarrito);
router.delete("/:id/productos/:id_prod", deleteProdCarrito);

module.exports = router;
