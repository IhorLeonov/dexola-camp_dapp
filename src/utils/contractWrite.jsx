import stakeABI from "./abis/stakeABI.json";
import struABI from "./abis/struABI.json";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { MyContext } from "../context/context";

export const stakeAddress = "0x2F112ED8A96327747565f4d4b4615be8fb89459d";
export const struAddress = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";

// approving token amount before staking, gets stake address and token amount in args
export const useApproveStaking = () => {
  const { setStatus } = MyContext();
  const {
    data: apprData,
    isLoading: apprWriteLoading,
    write: writeApprove,
  } = useContractWrite({
    address: struAddress,
    abi: struABI,
    functionName: "approve",

    onError() {
      setStatus("error");
    },
  });

  return { writeApprove, apprData, apprWriteLoading };
};

// method for waitting useApproveStaking transaction, gets in approve writing hash, stake writing function and token amount in props
export const useWaitForApprove = (data, writeStake, amount) => {
  const { setStatus, setIsLoadingTransaction } = MyContext();
  const { isLoading: apprLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      setIsLoadingTransaction("");
      setStatus("success_approve");
      writeStake({ args: [amount] });
    },
    onError() {
      setIsLoadingTransaction("");
      setStatus("error");
    },
  });

  return { apprLoading };
};

// send STRU token to stake, pass amount of staked token in args
export const useStakeToken = () => {
  const { setStatus } = MyContext();
  const {
    data: stakeData,
    isLoading: stakeWriteLoading,
    write: writeStake,
  } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "stake",

    onError() {
      setStatus("error");
    },
  });
  return { writeStake, stakeData, stakeWriteLoading };
};

// method for waitting useStakeToken transaction, gets in approve writing hash in props
export const useWaitForStake = (data) => {
  const { setStatus, setIsLoadingTransaction } = MyContext();
  const { isLoading: stakeLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      setIsLoadingTransaction("");
      setStatus("success_stake");
      console.log("Successful stake", data);
    },
    onError() {
      setIsLoadingTransaction("");
      setStatus("error");
    },
  });

  return { stakeLoading };
};

// get STRU token from stake, pass desired amount of token in args
export const useWithdraw = () => {
  const { setStatus } = MyContext();
  const {
    data: dataWithdraw,
    isLoading: withdrawIsLoading,
    write: writeWithdraw,
  } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "withdraw",
    onError() {
      setStatus("error");
    },
  });
  return { writeWithdraw, dataWithdraw, withdrawIsLoading };
};

// method for waitting useWithdraw transaction
export const useWaitForWithdraw = (data) => {
  const { setStatus, setIsLoadingTransaction } = MyContext();
  const { isLoading: withdrawLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      setIsLoadingTransaction("");
      setStatus("success_withdraw");
      console.log("Successful withdraw", data);
    },
    onError() {
      setIsLoadingTransaction("");
      setStatus("error");
    },
  });

  return { withdrawLoading };
};

// get rewards from stake
export const useClaimRewards = () => {
  const { setStatus } = MyContext();
  const {
    data: dataClaim,
    isLoading: claimIsLoading,
    write: writeClaim,
  } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "claimReward",
    onError() {
      setStatus("error");
    },
  });
  return { writeClaim, dataClaim, claimIsLoading };
};

// method for waitting useClaimRewards transaction
export const useWaitClaimRewards = (data) => {
  const { setStatus, setIsLoadingTransaction } = MyContext();
  const { isLoading: claimLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      setIsLoadingTransaction("");
      setStatus("success_claim");
      console.log("Successful getting claim rewards", data);
    },
    onError() {
      setIsLoadingTransaction("");
      setStatus("error");
    },
  });

  return { claimLoading };
};

// take all (staked balance + rewards) from stake
export const useTakeAll = () => {
  const { setStatus } = MyContext();
  const {
    data: takeAllData,
    isLoading: takeAllIsLoading,
    write: takeAllWrite,
  } = useContractWrite({
    address: stakeAddress,
    abi: stakeABI,
    functionName: "exit",
    onError() {
      setStatus("error");
    },
  });
  return { takeAllWrite, takeAllData, takeAllIsLoading };
};

// method for waitting useTakeAll transaction
export const useWaitTakeAll = (data) => {
  const { setStatus, setIsLoadingTransaction } = MyContext();
  const { isLoading: takeAllLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      setIsLoadingTransaction("");
      setStatus("success_exit");
      console.log("Successful getting all balance", data);
    },
    onError() {
      setIsLoadingTransaction("");
      setStatus("error");
    },
  });
  return { takeAllLoading };
};
