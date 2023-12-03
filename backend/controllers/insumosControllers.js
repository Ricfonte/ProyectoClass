import {Pedido, Producto} from "../models/listamodels.js"

const createPedidos = async (req, res) => {
   var pedidoData = req.body;
   var newPedido = await Pedido.create(pedidoData);
   res.json(newPedido);
}
const listaPedidos = async(req, res) =>{
    var newLista = await Pedido.find()
    res.json(newLista)
}
const idPedidos = async(req, res) =>{
    var idp = req.params.id;
    var listaFound = await Pedido.findById(idp)
    res.json(listaFound);
}
const deletePedidos = async(req, res) =>{
    var idp = req.params.id;
    await Pedido.findByIdAndDelete(idp);
    res.status(200) .json();
}
export { createPedidos, listaPedidos, deletePedidos, idPedidos }