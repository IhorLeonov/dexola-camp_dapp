import contractABI from "./contractABI.json";
import { useContractRead } from "wagmi";

const contractAddress = "0x2F112ED8A96327747565f4d4b4615be8fb89459d";

// reading staked balance, it takes current user address in args
export const useGetStakedBalance = (address) => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [`${address}`],
  });
  return Number(data);
};

// reading total number of rewards for the period
export const useGetNumberOfRewards = () => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getRewardForDuration",
  });
  return Number(data);
};

// reading the total amount of stakes made by all users
export const useGetTotalAmountOfStakes = () => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "totalSupply",
  });
  return Number(data);
};

// reading the timestamp of the end of the reward distribution period
export const useGetTimeStampOfTheEnd = () => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "periodFinish",
  });
  return Number(data);
};
