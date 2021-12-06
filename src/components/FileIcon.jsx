import React from "react";

const FileIcon = (props) => {
  const { text, icon, style, onClick } = props;
  return (
    <div
      className="icon"
      onClick={onClick}
      style={{ ...style, display: "flex", flexDirection: "column" }}
    >
      <img src={icon} style={{ height: "4rem", padding: "0.5rem" }} />
      <span style={{ fontSize: "0.8rem" }}>{text}</span>
    </div>
  );
};

export default FileIcon;
