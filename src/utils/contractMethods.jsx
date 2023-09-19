import stakeABI from "./abis/stakeABI.json";
import struABI from "./abis/stakeABI.json";
import { useContractRead, useContractWrite } from "wagmi";

const struAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";
const stakeAddress = "0x2F112ED8A96327747565f4d4b4615be8fb89459d";

// reading STRU token balance, takes user address in args
export const useGetSTRUBalance = (address) => {
  const { data } = useContractRead({
    address: struAddress,
    abi: struABI,
    functionName: "balanceOf",
    args: [`${address}`],
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

// send STRU token to stake
export const useStake = () => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "stake",
  });
  return { write, data, isLoading, isSuccess };

  // (
  //   <div>
  //     <button onClick={() => write()}>Feed</button>
  //     {isLoading && <div>Check Wallet</div>}
  //     {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
  //   </div>
  // );
};

export const useAprove = () => {
  const { write } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "stake",
  });
  return { write };
};
