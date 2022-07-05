const Carrito = require("../lib/carrito");
let { product } = require("../controllers/productos");

const archive = "carrito.txt";

let carrito = new Carrito(archive);
let name = "carritoUser_";
let userNum = 1;

const postCarrito = async (req, res) => {
  if (req.body) {
    const ans = await carrito.save(req.body);
    return res.status(200).send(await carrito.getById(parseInt(ans)));
  }

  return res.status(400).json({
    error: "Error al crear carrito",
  });
};

const deleteCarrito = async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ error: "El parametro no es numerico" });
  }

  const ans = await carrito.getById(parseInt(req.params.id));

  if (ans === null) {
    return res.status(400).json({ error: "Carrito no existe" });
  } else {
    return res
      .status(200)
      .json(await carrito.deleteById(parseInt(req.params.id)));
  }
};

const getProductosCarrito = async (req, res) => {
  const idCarrito = parseInt(req.params.id);

  if (isNaN(idCarrito)) {
    return res.status(400).json({ error: "El parametro no es numerico" });
  }

  res.status(200).json(await carrito.getAllProducts(idCarrito));
};

const postProductoCarrito = async (req, res) => {
  const idCarrito = parseInt(req.params.id);
  const id_prod = parseInt(req.params.id_prod);

  if (isNaN(idCarrito) || isNaN(id_prod)) {
    return res.status(400).json({ error: "El parametro no es numerico" });
  }

  const userProduct = await product.getById(id_prod);

  if (userProduct === null) {
    return res.status(400).json({ error: "El producto no se encuentra" });
  }

  const data = {
    idCarrito: idCarrito,
    producto: userProduct,
  };

  const answer = await carrito.put(data);

  return res.status(200).send(await carrito.getById(parseInt(answer)));
};

const deleteProductoCarrito = async (req, res) => {
  const idCarrito = parseInt(req.params.id);
  const id_prod = parseInt(req.params.id_prod);

  if (isNaN(idCarrito) || isNaN(id_prod)) {
    return res.status(400).json({ error: "El parametro no es numerico" });
  }

  const productDelete = await product.getById(id_prod);

  if (productDelete === null) {
    return res.status(400).json({ error: "El producto no se encuentra" });
  } else {
    const data = {
      idCarrito: idCarrito,
      producto: id_prod,
    };
    return res.status(200).json(await carrito.deleteById(data));
  }
};

module.exports = {
  postCarrito,
  deleteCarrito,
  getProductosCarrito,
  postProductoCarrito,
  deleteProductoCarrito,
};
