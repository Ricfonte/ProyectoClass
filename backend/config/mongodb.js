import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Rayo")
.then(() => console.log("dale no más, vamos bien"))
.catch((e) => console.log(e));