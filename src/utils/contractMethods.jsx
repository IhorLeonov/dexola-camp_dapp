import stakeABI from "./abis/stakeABI.json";
import struABI from "./abis/struABI.json";
import { useContractRead, useContractWrite } from "wagmi";
import { MyContext } from "../context/context";

export const stakeAddress = "0x2F112ED8A96327747565f4d4b4615be8fb89459d";
export const struAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

// reading STRU token balance, takes user address in args
export const useGetSTRUBalance = (address) => {
  const { data } = useContractRead({
    address: struAddress,
    abi: struABI,
    functionName: "balanceOf",
    args: [`${address}`],
    watch: true,
  });
  return Number(data);
};

// reading staked balance, takes user address in args
export const useGetStakedBalance = (address) => {
  const { data } = useContractRead({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "balanceOf",
    args: [`${address}`],
    watch: true,
  });
  return Number(data);
};

// reading total number of rewards for the period
export const useGetNumberOfRewards = () => {
  const { data } = useContractRead({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "getRewardForDuration",
  });
  return Number(data);
};

// reading the total amount of stakes made by all users
export const useGetTotalAmountOfStakes = () => {
  const { data } = useContractRead({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "totalSupply",
  });
  return Number(data);
};

// reading the timestamp of the end of the reward distribution period
export const useGetTimeStampOfTheEnd = () => {
  const { data } = useContractRead({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "periodFinish",
  });
  return Number(data);
};

// reading awailable amount rewards for user, takes user address in args
export const useGetUserRewards = (address) => {
  const { data } = useContractRead({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "earned",
    args: [`${address}`],
  });
  return Number(data);
};

// checking allowance before staking, gets owner and spender address in args
export const useCheckAllowance = (userAddress) => {
  const { data } = useContractRead({
    address: struAddress,
    abi: struABI,
    functionName: "allowance",
    args: [userAddress, stakeAddress],
    watch: true,
  });
  return Number(data);
};

// approving token amount before staking, gets stake address and token amount in args
export const useApproveToken = () => {
  const { setStatus } = MyContext();
  const {
    data,
    isLoading,
    isSuccess,
    write: writeApprove,
    status,
  } = useContractWrite({
    address: struAddress,
    abi: struABI,
    functionName: "approve",

    onSuccess() {
      setStatus("Approving successfull");
    },
    onError() {
      setStatus("Approving error");
    },
  });

  return { writeApprove, data, isLoading, isSuccess, status };
};

// send STRU token to stake
export const useStakeToken = () => {
  const { setStatus } = MyContext();
  const {
    data,
    isLoading,
    isSuccess,
    write: writeStake,
    status,
  } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "stake",

    onSuccess() {
      setStatus("Staking successfull");
    },
    onError() {
      setStatus("Staking error");
    },
  });
  return { writeStake, data, isLoading, isSuccess, status };
};
