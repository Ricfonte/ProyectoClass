import express  from "express";
import * as insumosRoutes from "./routes/insumoRoutes.js"


const app = express();

app.use(insumosRoutes.router);

app.listen(8080);