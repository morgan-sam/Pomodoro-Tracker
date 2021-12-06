import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAppContainerStyle } from "styles/app";
import { getContentBoxStyle } from "styles/settings";
import { DarkThemeContext } from "context/theme";
import Form from "components/Form";

const Input = (props) => {
  const { message, onSubmit } = props;
  const darkTheme = useContext(DarkThemeContext);
  const history = useHistory();

  return (
    <div className="screen-container" style={getAppContainerStyle(darkTheme)}>
      <div className="content-box" style={getContentBoxStyle(darkTheme)}>
        <h2 className="header">{message}</h2>
        <Form
          inputs={["password"]}
          submitText={"Confirm Password"}
          onSubmit={onSubmit}
          onCancel={() => history.push("/settings")}
        />
      </div>
    </div>
  );
};

export default Input;
