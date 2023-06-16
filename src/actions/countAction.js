export const upCount = (value) => {
  return {
    type: "UP_COUNT",
    payload: value,
  };
};

export const downCount = (value) => {
  return {
    type: "DOWN_COUNT",
    payload: value,
  };
};
