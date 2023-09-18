const dateNow = Date.now() / 1000;
const oneDay = 86400;

export const calcPercent = (numberOfRewards, totalAmount) => {
  return Math.round((numberOfRewards * 100) / totalAmount);
};

export const calcEndingTime = (timeStamp) => {
  return Math.round((timeStamp - dateNow) / oneDay);
};
