
const changeHSLOpacity = (hsl, opacity) => {
    const hslArray = hsl.replace('hsl(', '').replace(')', '').split(', ');
    return `hsla(${hslArray[0]}, ${hslArray[1]}, ${hslArray[2]}, ${opacity})`;
  }