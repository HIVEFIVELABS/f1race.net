// jsonUtils.jsx

export const parseJson = (json, fallback) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return fallback;
  }
};
