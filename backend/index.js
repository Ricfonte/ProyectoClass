import express  from "express";
import * as insumoRoutes from "./routes/insumosRoutes.js"
import mongoose from "mongoose";


const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/Rayo")
.then(() => console.log("Sigue, esta todo OK!!!"))
.catch((e) => console.log(e));

app.use(express.json());
app.use(insumoRoutes.router);

app.listen(8080);