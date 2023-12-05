import express  from "express";
import cors from "cors";
import * as insumoRoutes from "./routes/insumosRoutes.js"
import * as userRoutes from "./routes/userRoutes.js"
import "./config/mongodb.js";

const app = express();
app.use(cors());


app.use(express.json());
app.use(insumoRoutes.router);
app.use(userRoutes.router)

app.listen(8080);