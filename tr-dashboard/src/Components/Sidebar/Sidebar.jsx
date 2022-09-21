import React, { Component } from "react";
import Logo from "../../Assets/images/logo-w.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faWineBottle, faWineGlass } from "@fortawesome/free-solid-svg-icons";
import Get from "../../utils/Request.js";
import SubSidedbar from "./SubSidebar/SubSidebar";

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            usuarios: [],
        }
    }
    async componentDidMount() {
        const response = await fetch(`http://localhost:3001/api/users/`)
        const data = await response.json();
        this.setState({ usuarios: data.data[0] })
    }

    /*handleShow=() => {
        let side = document.querySelector(".container__sidebar")
        console.log("soy el boton")
        this.setState({ showSidebar: true });
        console.log(this.state.showSidebar)
    }*/
    parseData(){
        if(this.state.usuarios) {
            return this.state.usuarios.map((usuario, i) => <li key={usuario + i}> {usuario}</li>)}
             
    }
     
    
    render() {
        console.log(this.state.usuarios)

        return (
            <>
                <ul className="container__sidebar">

                    <div className="content__nav">
                        <button onClick={this.handleShow} className="icon__content">
                            <FontAwesomeIcon className="icon__hamburguer" icon={faBars} />
                        </button>
                        <div className="logo__content">
                            <img src={Logo} className="logo_terra" alt="terraRossa logo" />
                        </div>
                    </div>
                    
                    

                    <div className="container__paneles">
                        <li className="container__panel">
                            <Link className="panel" to="/usuarios">
                                <FontAwesomeIcon className="icon__user" icon={faUser} />
                                <span className="name__panel">Usuarios</span></Link>
                        </li>

                        <li className="container__panel">
                            <Link className="panel" to="/productos">
                                <FontAwesomeIcon className="icon__user" icon={faWineBottle} />
                                <span className="name__panel">Productos</span></Link>
                        </li>

                        <li className="container__panel">
                            <Link className="panel" to="/categorias">
                                <FontAwesomeIcon className="icon__user" icon={faWineGlass} />
                                <span className="name__panel">Categorias</span></Link>
                        </li>
                    </div>
                </ul>
            </>
        )
    }
}

export default Sidebar;