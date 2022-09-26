import React, { useEffect, useState } from "react";
import "./Usuarios.css";
import AllUsers from "../Components/Usuarios/AllUsers/AllUsers";
import LastUserDetail from "../Components/Usuarios/LastUserDetail/LastUserDetail";
import UserStadistics from "../Components/Usuarios/UserStadistics/UserStadistics";
import Bienvenida from "../Components/Bienvenida/Bienvenida";

function Usuarios() {
  const [lastCreated, setLastCreated] = useState({});
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const result = await fetch(`http://localhost:3001/api/users`);
      const usersJson = await result.json();
      setUsers(usersJson);
      setLastCreated(usersJson.lastUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  let datosInfo = [
    {
      detalle: 'Edad Promedio',
      dato: users.edadPromedio
    },
    {
      detalle: 'Total de Usuarios',
      dato: users.count
    }
  ]

  return (
    <>
    <Bienvenida welcomeTitle={"Usuarios"}/>
      <div className="users-main-container">
        <AllUsers totalUser = {users.count} />
        <div className="last-users-container">
          <div className="recent-users">
          <UserStadistics datos={datosInfo} />
          </div>
          <LastUserDetail lastUser={lastCreated} />
        </div>
        <div>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
