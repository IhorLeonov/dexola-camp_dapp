const dateNow = Date.now() / 1000;
const oneDay = 86400; //sec

export const calcPercent = (numberOfRewards, totalAmount) => {
  return Math.round((numberOfRewards * 100) / totalAmount);
};

export const calcEndingTime = (timeStamp) => {
  return Math.round((timeStamp - dateNow) / oneDay);
};

export const fromWei = (numb) => {
  return numb / 10 ** 18;
};

export const decimalWei = 10 ** 18;
