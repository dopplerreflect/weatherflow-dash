let cache = {
  rapid_wind: [],
  obs_st: [],
  summary: {},
};

export const setCache = (data: string) => {
  cache = JSON.parse(data);
};

export const getCache = () => {
  return cache;
};
