import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    cantidad: Number,
    Medida: String,
    nombre: String,
    centimetros: Number,
    urgente: Boolean
  });
  
 const pedidoSchema = new mongoose.Schema({
    nombre: String,
    departamento: String,
    fechaSolicitud: Date,
    productos: [productoSchema]
  });
  
  const Producto = mongoose.model("producto", productoSchema);
  const Pedido = mongoose.model("pedido", pedidoSchema);
 
  export {Pedido, Producto}
