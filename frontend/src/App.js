import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VerListado}  from "./pages/listadoPage/verListado"; // Agrega llaves {}

import CrearPedido from "./pages/pedidoPage/crearPedido";
import IngresoPage from "./pages/ingresoPage/ingresoPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/listado" element={<VerListado />}></Route>
          <Route path="/new" element={<CrearPedido />}></Route>
          <Route path="/" element={<IngresoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
