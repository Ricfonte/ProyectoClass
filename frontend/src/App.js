import {  BrowserRouter, Routes, Route } from "react-router-dom";
import { VerListado } from "./pages/listadoPage/verListado";
import  CrearPedido from "./pages/pedidoPage/crearPedido";


function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path= "/listado" element = {<VerListado></VerListado>}></Route>
        <Route path= "/new" element = {<CrearPedido></CrearPedido>}></Route>
      </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
