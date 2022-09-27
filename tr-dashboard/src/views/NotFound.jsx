import React from "react";
import logoNotFound from "../Assets/images/404.png";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return <div className="not-found-wrapper">
        <h1>pagina no encontrada</h1>
        <img src={logoNotFound} alt="pagina no encontrada" />
        <div className="not-found-button">
          <Link className="not-found-link" to="/">
              <span className="not-found-text">volver</span>
          </Link>
        </div>
    </div>
  }

export default NotFound;
