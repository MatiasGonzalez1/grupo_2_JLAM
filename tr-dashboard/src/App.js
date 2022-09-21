import Sidebar from "./Components/Sidebar/Sidebar";
import './Components/Sidebar/sidebar.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Usuarios from "./Components/Usuarios/Usuarios";
import Products from "./Components/Productos/Products";
import Categorias from "./Components/Categorias/Categorias";
import Index from "./views/Home"
import "./App.css";

function App() {
  return (
    <div className="main-wrapper">
       {/* <!-- Sidebar -->  */}
       <Sidebar />
       {/* <!-- End of Sidebar --> */}
       
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/usuarios" component={Usuarios} />
          <Route path="/products" component={Products} />
          <Route path="/categorias" component={Categorias} />
          
          <Route>
            <Redirect to="/?error=pagina_no_encontrada" />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
