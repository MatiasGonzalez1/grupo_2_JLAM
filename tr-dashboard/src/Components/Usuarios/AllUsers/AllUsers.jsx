import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import "./AllUsers.css";
import UserCard from "../UserCard/UserCard";

function AllUsers(totalUser) {
  const limitPage = Math.floor(totalUser.totalUser / 4)
  const [userPage, setUserPage] = useState([]);
  const [page, setPage] = useState(0);

  let url = `http://localhost:3001/api/users?page=${page}`;

  const pageUsers = async () => {
    try {
      const result = await fetch(url);
      const userJson = await result.json();
      setUserPage(userJson.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pageUsers();
  }, []);

  
  useEffect(()=>{
    pageUsers();
  },[page])


  return (
    <>
      <div className="all-users">
        <h2 className="title-container">
          Usuarios registrados
        </h2>
        <div className="user-card-container">
          {userPage.map((user) => (
            <UserCard
            key={user.id}
            id={user.id}
            firsName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            fechaRegistro={user.createAt}
            imgPath={user.userImg}
            detailLink={user.detail}
            />
            ))}
        </div>
        <div className="pagination-container">
             <div className="button-prev" onClick={()=> page>0? setPage(page-1): setPage(page-0) }>
              <FontAwesomeIcon className="arrow-icon" icon={faArrowLeftLong} />
            </div> 
          <span className="page-container">{page}</span>
          <div className="button-next" onClick={()=> page !== limitPage ?setPage(page + 1):setPage(page + 0)}>
            <FontAwesomeIcon className="arrow-icon" icon={faArrowRightLong} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
