const validFields = {
  question: (value) => typeof value === "string",
  answer: (value) => typeof value === "string",
  description: (value) => typeof value === "string",
  resources: (value) =>
    Array.isArray(value) && value.every((item) => typeof item === "string"),
  level: Number.isInteger,
  completed: (value) => typeof value === "boolean",
  editDate: (value) => typeof value === "string",
};

const isValidBody = (body, requiredFields) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const fields = Object.keys(body);
  return (
    fields.length > 0 &&
    requiredFields.every((field) => Object.hasOwn(body, field)) &&
    fields.every(
      (field) =>
        Object.hasOwn(validFields, field) && validFields[field](body[field]),
    )
  );
};

export { isValidBody };
