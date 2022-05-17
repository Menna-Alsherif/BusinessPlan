// function that takes an index and returns the year corresponding to it

export const getDynamicYear = (index) => {
  let current_year = new Date().getFullYear();
  return current_year + index;
};

export const Years = {
  First: getDynamicYear(0),
  Second: getDynamicYear(1),
  Third: getDynamicYear(2),
  Fourth: getDynamicYear(3),
  Fifth: getDynamicYear(4),
};
