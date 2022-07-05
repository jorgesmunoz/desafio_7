const Producto = require("../lib/productos");

const archive = "productos.txt";

let product = new Producto(archive);

const getProductos = async (req, res) => {
  res.status(200).json(await product.getAll());
};

const getProductosId = async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ error: "El parametro no es numerico" });
  }

  if ((await product.getById(parseInt(req.params.id))) === null) {
    return res.status(400).json({ error: "El producto no se encuentra" });
  } else {
    res.status(200).json(await product.getById(parseInt(req.params.id)));
  }
};

const postProducto = async (req, res) => {
  const { name, description, code, picture, price, stock } = req.body;
  if (name && description && code && picture && stock) {
    const ans = await product.save({
      timestamp: Date.now(),
      name: name,
      description: description,
      code: code,
      picture: picture,
      price: price,
      stock: stock,
    });
    return res.status(200).json(await product.getById(parseInt(ans)));
  }

  return res.status(400).json({
    error:
      "Deben cargarse todos los campos del producto (name, description, code, picture, price, stock",
  });
};

const putProducto = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El parametro no es numerico" });
  }

  const ans = await product.getById(id);

  if (ans === null) {
    return res.status(400).json({ error: "El producto no se encuentra" });
  }

  for (let item in req.body) {
    ans[item] = req.body[item];
  }

  const answer = await product.put(ans);
  return res.status(200).json(await product.getById(parseInt(answer)));
};

const deleteProducto = async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ error: "El parametro no es numerico" });
  }

  const ans = await product.getById(parseInt(req.params.id));

  if (ans === null) {
    return res.status(400).json({ error: "El producto no se encuentra" });
  } else {
    return res
      .status(200)
      .json(await product.deleteById(parseInt(req.params.id)));
  }
};

module.exports = {
  getProductos,
  getProductosId,
  postProducto,
  putProducto,
  deleteProducto,
  product,
};
