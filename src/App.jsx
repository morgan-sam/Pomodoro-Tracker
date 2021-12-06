import React, { useState, useEffect } from "react";
import { DarkThemeProvider, ColorThemeProvider } from "context/theme";
import Main from "screens/Main";
import Home from "screens/Home";
import Settings from "screens/Settings";
import AccountSettings from "screens/AccountSettings";
import DisplaySettings from "screens/DisplaySettings";
import Script from "screens/Script";
import LoginSignUp from "screens/LoginSignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "context/auth";
import PrivateRoute from "routes/PrivateRoute";
import AuthRedirectRoute from "routes/AuthRedirectRoute";
import { defaultOptions } from "data/defaultState";

const App = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [fadeIn, setFadeIn] = useState(true);

  const convertColorThemeToColors = () => {
    let gradients = ["light", "mid", "dark", "darker"];
    const { hue, saturation, lightness } = options.colorTheme;
    return gradients.reduce((el, item, index) => {
      const color = `hsl(${hue}, ${saturation}%, ${
        lightness - (index - 4) * 10
      }%)`;
      el[item] = color;
      return el;
    }, {});
  };

  return (
    <ColorThemeProvider value={convertColorThemeToColors(options.colorTheme)}>
      <DarkThemeProvider value={options.darkTheme}>
        <AuthProvider>
          <Router>
            <PrivateRoute
              exact
              path="/"
              AuthComponent={Main}
              DefaultComponent={Home}
              {...{ options, setOptions, fadeIn, setFadeIn }}
            />
            <Route
              exact
              path="/login"
              render={(props) => <LoginSignUp type="login" {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) => <LoginSignUp type="signup" {...props} />}
            />
            <AuthRedirectRoute
              exact
              path="/settings"
              AuthComponent={Settings}
              redirect={"/login"}
              {...{ options, setOptions }}
            />
            <AuthRedirectRoute
              exact
              path="/settings/display"
              AuthComponent={DisplaySettings}
              redirect={"/login"}
              {...{ options, setOptions }}
            />
            <AuthRedirectRoute
              exact
              path="/settings/account"
              AuthComponent={AccountSettings}
              redirect={"/login"}
              {...{ options, setOptions }}
            />
            <AuthRedirectRoute
              exact
              path="/script"
              AuthComponent={Script}
              redirect={"/login"}
              {...{ options, setOptions }}
            />
          </Router>
        </AuthProvider>
      </DarkThemeProvider>
    </ColorThemeProvider>
  );
};

export default App;
