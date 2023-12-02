import express from "express";
import * as insumosCtlr from"../controllers/insumosControllers.js"

const router = express.Router();
router.post("/insumos/pedidos", insumosCtlr.createInsumos);

export {router}