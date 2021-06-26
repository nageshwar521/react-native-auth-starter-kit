const generatePlans = (data = {}) => {
  const result = Object.keys(data).map((dataKey) => {
    return data[dataKey];
  });
  return result;
};

export {generatePlans};
