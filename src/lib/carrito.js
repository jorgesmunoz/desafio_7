const { log } = require("console");
const fs = require("fs");

class Carrito {
  static id = 0;
  static objects = [];

  constructor(archivo) {
    this.archivo = archivo;
    this.id;
    this.timestamp;
    this.productos = [];
  }

  addId() {
    Carrito.id += 1;
  }

  async save(carrito) {
    try {
      this.addId();
      this.id = Carrito.id;
      this.timestamp = Date.now();
      const carrito = {
        id: this.id,
        timestamp: this.timestamp,
        productos: this.productos,
      };
      Carrito.objects.push(carrito);
      fs.promises.writeFile(this.archivo, JSON.stringify(carrito, null, 2));
    } catch (error) {
      console.log("Error writing carrito");
    }

    return Carrito.id;
  }

  async put(data) {
    try {
      this.id = data["idCarrito"];
      this.timestamp = Date.now();
      this.productos.push(data["producto"]);
      const userCarrito = {
        id: this.id,
        timestamp: this.timestamp,
        productos: this.productos,
      };
      fs.promises.writeFile(this.archivo, JSON.stringify(userCarrito, null, 2));
    } catch (error) {
      console.log("Error writing file");
    }

    return this.id;
  }

  async getById(idNumber) {
    try {
      const object = await fs.promises.readFile(this.archivo);
      if (object) {
        return object;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error reading object");
    }
  }

  async getAllProducts(idCarrito) {
    const object = Carrito.objects[idCarrito - 1];
    try {
      return object["productos"];
    } catch (error) {
      console.log("Error getting all objects");
    }
  }

  async deleteById(prodToDelete) {
    const object = Carrito.objects[prodToDelete.idCarrito - 1]["productos"];
    try {
      const producto = object.find((obj) => obj.id === prodToDelete.producto);
      this.productos = object.filter((obj) => obj.id !== producto.id);
      console.log(this.productos);
      const data = {
        id: this.id,
        timestamp: this.timestamp,
        productos: this.productos,
      };
      Carrito.objects[prodToDelete.idCarrito - 1] = data;

      fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log("Error deleting an object");
    }
  }
}

module.exports = Carrito;
