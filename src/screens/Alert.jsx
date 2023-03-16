import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAppContainerStyle } from "styles/app";
import { getSystemButtonStyle, getContentBoxStyle } from "styles/settings";
import { DarkThemeContext } from "context/theme";

const Alert = (props) => {
  const { message } = props;
  const darkTheme = useContext(DarkThemeContext);
  const navigate = useNavigate();
  const accountButtonStyle = getSystemButtonStyle(darkTheme);

  return (
    <div className="screen-container" style={getAppContainerStyle(darkTheme)}>
      <div className="content-box" style={getContentBoxStyle(darkTheme)}>
        <h2 className="header">{message}</h2>
        <div className="footer">
          <button
            style={accountButtonStyle}
            onClick={() => navigate("/settings")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
