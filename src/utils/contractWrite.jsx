import stakeABI from "./abis/stakeABI.json";
import struABI from "./abis/struABI.json";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { MyContext } from "../context/context";
import { fromWei } from "./mathHelpers";

export const stakeAddress = "0x2F112ED8A96327747565f4d4b4615be8fb89459d";
export const struAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

// approving token amount before staking, gets stake address and token amount in args
export const useApproveStaking = () => {
  const { setStatus, setStatusMessage } = MyContext();
  const {
    data: apprData,
    isLoading: apprWriteLoading,
    isError: apprWriteError,
    write: writeApprove,
  } = useContractWrite({
    address: struAddress,
    abi: struABI,
    functionName: "approve",

    onError(error) {
      setStatus("error");
      setStatusMessage(error.message.slice(0, 27));
    },
  });

  return { writeApprove, apprData, apprWriteLoading, apprWriteError };
};

// send STRU token to stake, pass amount of staked token in args
export const useStakeToken = () => {
  const { setStatus, setStatusMessage } = MyContext();
  const {
    data: stakeData,
    isLoading: stakeWriteLoading,
    isError: stakeWriteError,
    write: writeStake,
  } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "stake",

    onError(error) {
      setStatus("error");
      setStatusMessage(error.message.slice(0, 27));
    },
  });
  return { writeStake, stakeData, stakeWriteLoading, stakeWriteError };
};

// method for waitting approve transaction, gets in approve writing hash, stake writing function and token amount in props
export const useWaitForApprove = (apprData, writeStake, payload) => {
  const { setStatus } = MyContext();
  const { isLoading: apprLoading } = useWaitForTransaction({
    hash: apprData?.hash,
    onSuccess() {
      setStatus("success_approve");
      writeStake({ args: [payload] });
    },
    onError() {
      setStatus("error");
      // setStatusMessage("Connection Error. Please try again");
    },
  });

  return { apprLoading };
};

// method for waitting stake transaction, gets in approve writing hash and token amount in props
export const useWaitForStake = (stakeData) => {
  const { setStatus } = MyContext();
  const { isLoading: stakeLoading } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSuccess(data) {
      setStatus("success_stake");
      console.log("Success stake", data);
    },
    onError() {
      setStatus("error");
      // setStatusMessage("Connection Error. Please try again");
    },
  });

  return { stakeLoading };
};

// get STRU token from stake, pass desired amount of token in args
export const useWithdraw = () => {
  const { data, isLoading, write } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "withdraw",
  });
  return { write, data, isLoading };
};

// get rewards from stake
export const useClaimRewards = () => {
  const { data, isLoading, write } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "claimReward",
  });
  return { write, data, isLoading };
};
