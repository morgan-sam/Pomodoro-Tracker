import React from "react";
import { useNavigate } from "react-router-dom";
import { getAppContainerStyle } from "styles/app";
import { getSystemButtonStyle, getContentBoxStyle } from "styles/settings";

const Settings = (props) => {
  const { options } = props;
  const navigate = useNavigate();
  const accountButtonStyle = getSystemButtonStyle(false);
  return (
    <div
      className="screen-container"
      style={getAppContainerStyle(options.darkTheme)}
    >
      <div
        className="content-box"
        style={getContentBoxStyle(options.darkTheme)}
      >
        <h2 className="header">Settings</h2>
        <div className="button-column">
          <button
            style={accountButtonStyle}
            onClick={() => navigate("/settings/display")}
          >
            Display Settings
          </button>
          <button
            style={accountButtonStyle}
            onClick={() => navigate("/settings/account")}
          >
            Account Settings
          </button>
        </div>
        <div className="footer">
          <button style={accountButtonStyle} onClick={() => navigate("/")}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
