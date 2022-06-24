const Contenedor = require("../contenedor.js");
const io = require("../app");
const { log } = require("console");
const fs = require("fs");

let product = new Contenedor("productos.txt");
let flag = false;

const getCarrito = (req, res) => {
  console.log("entro a get product");

  res.render("datos");
};

const postCarrito = (req, res) => {
  res.redirect("/productos");
};

const deleteCarrito = (req, res) => {
  res.redirect("/productos");
};

const postProdCarrito = (req, res) => {
  res.redirect("/productos");
};

const deleteProdCarrito = (req, res) => {
  res.redirect("/productos");
};

module.exports = {
  getCarrito,
  postCarrito,
  deleteCarrito,
  postProdCarrito,
  deleteProdCarrito,
};
