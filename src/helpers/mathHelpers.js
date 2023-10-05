const oneDay = 86400;

export const currentStamp = Date.now() / 1000;

export const calcPercent = (numberOfRewards, totalAmount) => {
  return Math.round((Number(numberOfRewards) * 100) / Number(totalAmount));
};

export const calcEndingTime = (timeStamp) => {
  return Math.round((Number(timeStamp) - currentStamp) / oneDay);
};

export const fromWei = (numb) => {
  return numb / 10 ** 18;
};

export const decimalWei = 10 ** 18;
