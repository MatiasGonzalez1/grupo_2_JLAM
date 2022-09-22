import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./views/Home"
import Usuarios from "./views/Usuarios";

import Sidebar from "./Components/Sidebar/Sidebar";
import AllProducts from "./Components/Productos/AllProducts/AllProducts";
import Bienvenida from "./Components/Bienvenida/Bienvenida";
import ProductDetail from "./Components/Productos/ProductDetail";
import Categorias from "./Components/Categorias/Categorias";

import "./App.css";

function App() {
  return (
    <div className="main-wrapper">
      {/* <!-- Sidebar -->  */}
      <Sidebar />
      {/* <!-- End of Sidebar --> */}
      <div className="main-wrapper--info">
        <Bienvenida />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* react tira warnings en consola si los componentes estan vacios, no descomentar hasta que se utilicen */}
          <Route path="/users" component={Usuarios} />
          <Route path="/products" component={AllProducts} />
          <Route path="/product-detail/:id" component={ProductDetail} />
          {/* <Route path="/categorias" component={Categorias} /> */}
          
          <Route>
            <Redirect to="/?error=pagina_no_encontrada" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
