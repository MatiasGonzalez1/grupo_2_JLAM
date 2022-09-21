import Sidebar from "./Components/Sidebar/Sidebar";
import './Components/Sidebar/sidebar.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Usuarios from "./views/Usuarios";
import Productos from "./Components/Productos/Productos";
import Categorias from "./Components/Categorias/Categorias";
import Bienvenida from "./Components/Bienvenida/Bienvenida";
import Index from "./views/Home"
import "./App.css";

function App() {
  return (
    <div className="main-wrapper">
      {/* <!-- Sidebar -->  */}
      <Sidebar />
      {/* <!-- End of Sidebar --> */}
      <Bienvenida/>
       
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/usuarios" component={Usuarios} />
          <Route path="/productos" component={Productos} />
          <Route path="/categorias" component={Categorias} />
          
          <Route>
            <Redirect to="/?error=pagina_no_encontrada" />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
