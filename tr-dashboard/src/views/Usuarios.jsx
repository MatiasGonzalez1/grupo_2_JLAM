import React from "react";
import LastUserDetail from "../Components/Usuarios/LastUserDetail/LastUserDetail";
import './Usuarios.css';

function Usuarios() {
  return (
    <div className="users-main-container">
        <div className="all-users">
          <h2>titulo + tarjetas de usuarios con paginado</h2>
          <div className="user-card-container">
            <div className="user-card"></div>
            <div className="user-card"></div>
            <div className="user-card"></div>
            <div className="user-card"></div>
            <div className="user-card"></div>
          </div>
        </div>
        <div className="last-users-container">
            <div className="recent-users"></div>
            <LastUserDetail/>
        </div>
    </div>
  )
}

export default Usuarios