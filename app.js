const Contenedor = require("./contenedor.js");
const { log } = require("console");
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const path = require("path");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

// Routes para primera entrega del proyecto final
const productos = require("./routes/productos.js");
const carrito = require("./routes/carrito.js");
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);

let product = new Contenedor("productos.txt");

let userChatMessages = [];

const PORT = 8080;
let cont = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.set("socketio", io);

app.get("/productos", (req, res) => {
  // let product = new Contenedor("productos.txt");
  res.render("datos");
});

// app.use("/productos", productos);

io.on("connection", async (channel) => {
  cont++;
  channel.on("incomingProduct", async (producto) => {
    console.log("Entro a channel on");
    await product.save({ title: producto.title, price: producto.price });
    const ans = await product.getAll();
    io.sockets.emit("productList", ans);
  });

  channel.on("newUserMessage", (newMessage) => {
    userChatMessages.push(newMessage);
    io.sockets.emit("messages", userChatMessages);
  });

  const ans = await product.getAll();
  if (ans !== 0) {
    channel.emit("productList", ans);
  }

  channel.emit("messages", userChatMessages);

  console.log(`Connection N°: ${cont}`);
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
