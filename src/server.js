const express = require("express");
const app = express();
const PORT = 8080;

// const { engine } = require("express-handlebars");

const routerProducto = require("../routes/productos");
const routerCarrito = require("../routes/carrito");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./views");

// app.use(express.static("public"));

app.use("/api/productos", routerProducto);
app.use("/api/carrito", routerCarrito);

app.use("*", (req, res) => {
  res.status(301).send("forbidden!");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
