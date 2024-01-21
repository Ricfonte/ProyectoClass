import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  cantidad: { type: Number, required: true, min: 1 },
  medida: { type: String, required: true},
  nombre: { type: String, required: true },
  centimetros: { type: Number, min: -1 },
  urgente: { type: Boolean, required: true }
});

const pedidoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  fechaSolicitud: { type: Date, required: true },
  productos: { type: [productoSchema], required: true, validate: [arrayMinLength, 'Debe haber al menos un producto en el pedido'] }
 
});



function arrayMinLength(arr) {
  return arr && arr.length > 0;
}

const Producto = mongoose.model("producto", productoSchema);
const Pedido = mongoose.model("pedido", pedidoSchema);

export { Pedido, Producto };
