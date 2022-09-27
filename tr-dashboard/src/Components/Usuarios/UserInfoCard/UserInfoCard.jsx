import React from "react";
import OneCard from "../../../utils/OneCard/OneCard";

const UserInfoCard = ({ title, quantity, icon }) => {
  return (
    <div>
      <OneCard title={title} quantity={quantity} icon={icon} />
    </div>
  );
};

export default UserInfoCard;
