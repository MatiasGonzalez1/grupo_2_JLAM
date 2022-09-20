import Sidebar from "./Components/Sidebar/Sidebar";
import './Components/Sidebar/sidebar.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Usuarios from "./Components/Usuarios/Usuarios";
import Productos from "./Components/Productos/Productos";
import Categorias from "./Components/Categorias/Categorias";
import Index from "./views/Index"

function App() {
  return (
    <div>
       {/* <!-- Sidebar -->  */}
       <Sidebar />
       {/* <!-- End of Sidebar --> */}

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
