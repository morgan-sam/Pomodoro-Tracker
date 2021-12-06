export const randInt = (min, max, skew = 1) =>
  Math.floor(Math.pow(Math.random(), skew) * (max - min + 1)) + min;
export const randBoo = () => Boolean(Math.random() > 0.5);
