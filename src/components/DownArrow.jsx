import React from "react";
import arrow from "img/doubledown.png";

const DownArrow = (props) => {
  const { type, onClick } = props;
  return (
    <img
      className="down-arrow"
      onClick={onClick}
      src={arrow}
      style={{
        height: "8vh",
        transform: `scaleY(${type === "up" ? -1 : 1})`,
        cursor: "pointer",
      }}
    />
  );
};

export default DownArrow;
