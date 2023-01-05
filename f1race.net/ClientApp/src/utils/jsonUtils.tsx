// Path: f1race.net/ClientApp/src/utils/jsonUtils.tsx

export const parseJson = (json: string, fallback: any): any => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return fallback;
  }
};
