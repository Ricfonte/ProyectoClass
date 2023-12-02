import express from "express";
import * as pedidosCtlr from"../controllers/insumosControllers.js"

const router = express.Router();
router.post("/insumos/pedidos", pedidosCtlr.createPedidos);
router.get("/insumos/pedidos/lista", pedidosCtlr.listaPedidos);
router.get("/insumos/pedidos/:id", pedidosCtlr.idPedidos);
router.delete("/insumos/pedidos/delete/:id", pedidosCtlr.deletePedidos);


export {router}