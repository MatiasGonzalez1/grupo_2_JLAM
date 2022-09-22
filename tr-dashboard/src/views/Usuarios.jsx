import React from "react";
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
            <div className="last-user">

            </div>
        </div>
    </div>
  )
}

export default Usuarios