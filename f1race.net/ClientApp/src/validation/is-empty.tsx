// Path: f1race.net/ClientApp/src/validation/is-empty.tsx

const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (value instanceof Object && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
export default isEmpty;
