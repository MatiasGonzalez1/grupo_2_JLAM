import React, { useState, useEffect } from "react";
import Logo from "../../Assets/images/logo-w.png";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faWineBottle, faWineGlass } from "@fortawesome/free-solid-svg-icons";
import Img from "../../Assets/images/admin@admin.com_1657413736084.png";

function Sidebar() {
    const [usuarios, setUsuarios] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:3001/api/users/2`)
		.then(function(response) {
			return response.json();
		})
		.then(function(usuarios) {
			setUsuarios([usuarios])
		})
		.catch(error => console.error(error));
		//le cambiamos el estado a movies
	},[])
    console.log(usuarios)

    const handleShow=() => {
        let but = document.querySelector(".icon__hamburguer")
        let sid = document.querySelector(".container__sidebar").classList.toggle('active')
        
    }
    return (

        <>
            <ul className="container__sidebar">

                <div className="content__nav">
                    <Link className="logo__content" to="/">
                        <img src={Logo} className="logo_terra" alt="terraRossa logo" />
                    </Link>
                    <div className="icon__content" onClick={()=>handleShow()} icon={faBars}>
                        <FontAwesomeIcon className="icon__hamburguer" icon={faBars} />
                    </div>
                </div>

                <div className="data_content">
                    {usuarios.map((usuario,i)=> {
                        return (
                            <ul key={i}>
                                <ul key={i}>
                            <div className="user__sidebar">{usuario.data.firstName}</div>
                            <div className="user__sidebar_correo">{usuario.data.email}</div>
                            <div className="user__sidebar_img">
                                <img src={Img} className="img_user" alt="imagen de usuario" /></div></ul>
                            </ul>
                        );
                        })}
                </div>

                <div className="container__paneles">
                    <li className="container__panel">
                        <Link className="panel" to="/users">
                            <span className="name__panel">Usuarios</span>
                            <FontAwesomeIcon className="icon__user" icon={faUser} /></Link>
                    </li>

                    <li className="container__panel">
                        <Link className="panel" to="/products">
                            <span className="name__panel">Productos</span>
                            <FontAwesomeIcon className="icon__user" icon={faWineBottle} /></Link>
                    </li>

                    <li className="container__panel">
                        <Link className="panel" to="/categorias">
                            <span className="name__panel">Categorias</span>
                            <FontAwesomeIcon className="icon__user" icon={faWineGlass} /></Link>
                    </li>
                </div>
            </ul>
        </>
    )
}


export default Sidebar;