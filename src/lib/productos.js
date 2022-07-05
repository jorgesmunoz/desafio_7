const fs = require("fs");

class Producto {
  static id = 0;

  constructor(archivo) {
    this.archivo = archivo;
    this.objects = [];
  }

  addId() {
    Producto.id += 1;
  }

  async save(product) {
    try {
      this.addId();
      product["id"] = Producto.id;
      this.objects.push(product);
      fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.objects, null, 2)
      );
    } catch (error) {
      console.log("Error writing file");
    }

    return Producto.id;
  }

  async put(product) {
    try {
      this.objects[product["id"] - 1] = {
        id: product["id"],
        name: product["name"],
        description: product["description"],
        code: product["code"],
        picture: product["picture"],
        price: product["price"],
        stock: product["stock"],
      };
      fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.objects, null, 2)
      );
    } catch (error) {
      console.log("Error writing file");
    }

    return product["id"];
  }

  async getById(idNumber) {
    try {
      const data = JSON.parse(await fs.promises.readFile(this.archivo));
      const object = data.find((obj) => obj.id === idNumber);
      if (object) {
        return object;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error reading object");
    }
  }

  async getAll() {
    try {
      const data = JSON.parse(await fs.promises.readFile(this.archivo));
      return data;
    } catch (error) {
      console.log("Error getting all objects");
    }
  }

  async deleteAll() {
    try {
      this.objects = [];
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.objects, null, 2)
      );
      console.log("All objects were deleted");
    } catch (error) {
      console.log("Objects not deleted");
    }
  }

  async deleteById(idNumber) {
    try {
      let data = JSON.parse(await fs.promises.readFile(this.archivo));
      const object = data.find((obj) => obj.id === idNumber);
      this.objects = data.filter((obj) => obj.id !== object.id);
      fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.objects, null, 2)
      );
    } catch (error) {
      console.log("Error deleting an object");
    }
  }
}

module.exports = Producto;
