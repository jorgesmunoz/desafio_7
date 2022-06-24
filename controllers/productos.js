const Contenedor = require("../contenedor.js");
const io = require("../app");
const { log } = require("console");
const fs = require("fs");

let product = new Contenedor("productos.txt");
let flag = false;

const productos = [];

// Save some objects
(async () => {
  await product.save({ title: "manzanas", price: 3.5 });
  await product.save({ title: "bananas", price: 11.0 });
  await product.save({ title: "peras", price: 15.0 });
  await product.save({ title: "tomates", price: 13.0 });
})();

let cont = 0;

const getProductos = (req, res) => {
  console.log("entro a get product");

  res.render("datos");
};

const postProducto = (req, res) => {
  res.redirect("/productos");
};

const putProducto = (req, res) => {
  res.redirect("/productos");
};

const deleteProducto = (req, res) => {
  res.redirect("/productos");
};

module.exports = {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto,
};
