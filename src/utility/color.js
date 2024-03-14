export const changeHSLOpacity = (hsl, opacity) => {
  const hslArray = hsl.replace("hsl(", "").replace(")", "").split(", ");
  return `hsla(${hslArray[0]}, ${hslArray[1]}, ${hslArray[2]}, ${opacity})`;
};

export const interpolateColor = (hsl, opacity) => {
  const hslArray = hsl.replace("hsl(", "").replace(")", "").split(", ");
  const h = parseInt(hslArray[0]);
  const s = parseInt(hslArray[1]);
  const l = parseInt(hslArray[2]);
  const interpolatedL = l + (100 - l) * (1 - opacity);
  return `hsl(${h}, ${s}%, ${Math.max(parseFloat(hslArray[2]), interpolatedL)}%)`;
};
