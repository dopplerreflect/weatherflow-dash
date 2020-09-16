export const hueForSpeed = (mph: number) => {
  if (mph >= 25) {
    return -82.5;
  }
  return 230 - mph * 12.5;
};
