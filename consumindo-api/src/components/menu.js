import { Link, Outlet } from "react-router-dom";
import "./menu.css";

function Menu() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/cadastro"}>Cadastro</Link>
          </li>
          <li>
            <Link to={"/consulta"}>Consulta</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Menu;