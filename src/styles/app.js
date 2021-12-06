export const getAppContainerStyle = (darkTheme) => {
  return {
    backgroundColor: darkTheme ? "#282c34" : "white",
    color: darkTheme ? "white" : "black",
  };
};
