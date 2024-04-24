import React, { useState } from "react";
import { DarkThemeProvider, ColorThemeProvider } from "context/theme";
import Main from "screens/Main";
import Home from "screens/Home";
import Settings from "screens/Settings";
import AccountSettings from "screens/AccountSettings";
import DisplaySettings from "screens/DisplaySettings";
import Script from "screens/Script";
import LoginSignUp from "screens/LoginSignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "context/auth";
import Private from "routes/Private";
import Redirect from "routes/Redirect";
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
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Private
                    AuthComponent={Main}
                    DefaultComponent={Home}
                    {...{ options, setOptions, fadeIn, setFadeIn }}
                  />
                }
              />
              <Route path="/login" element={<LoginSignUp type="login" />} />
              <Route path="/signup" element={<LoginSignUp type="signup" />} />
              <Route
                path="/settings"
                element={
                  <Redirect
                    AuthComponent={Settings}
                    redirect={"/login"}
                    {...{ options, setOptions }}
                  />
                }
              />
              <Route
                path="/settings/display"
                element={
                  <Redirect
                    AuthComponent={DisplaySettings}
                    redirect={"/login"}
                    {...{ options, setOptions }}
                  />
                }
              />
              <Route
                path="/settings/account"
                element={
                  <Redirect
                    AuthComponent={AccountSettings}
                    redirect={"/login"}
                    {...{ options, setOptions }}
                  />
                }
              />
              <Route
                path="/script"
                element={
                  <Redirect
                    AuthComponent={Script}
                    redirect={"/login"}
                    {...{ options, setOptions }}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DarkThemeProvider>
    </ColorThemeProvider>
  );
};

export default App;
