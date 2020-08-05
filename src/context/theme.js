import React from 'react';

const ThemeContext = React.createContext();

export const DarkThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;
