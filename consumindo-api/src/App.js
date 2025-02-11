import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/menu";
import AddContact from "./components/addContact";
import ReadContact from "./components/readContact";

function App() {
  return (
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/cadastro" element={<AddContact />} />
        <Route path="/consulta" element={<ReadContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
