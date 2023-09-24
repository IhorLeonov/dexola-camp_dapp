import s from "./Notification.module.scss";
import { MyContext } from "../../context/context";
import { fromWei } from "../../utils/mathHelpers";
import { useEffect } from "react";
import crossIcon from "../../assets/icons/cross.svg";
import tickIcon from "../../assets/icons/tick.svg";
import { useLocation } from "react-router-dom";

export const Notification = () => {
  const location = useLocation();
  const {
    status,
    setStatus,
    isLoadingTransaction,
    setIsLoadingTransaction,
    payload,
  } = MyContext();

  const tokenAmount = fromWei(payload);

  // close notification
  useEffect(() => {
    if (status.includes("success") || status.includes("error")) {
      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  }, [status]);

  // close notification if user change route
  useEffect(() => {
    setStatus("");
    setIsLoadingTransaction("");
  }, [location]);

  return (
    <div className={s.notify}>
      {/*  showing loader  */}
      {isLoadingTransaction && <div className={s.notify_loader} />}
      {/*  showing success img  */}
      {status.includes("success") && (
        <div className={s.notify_circle_success}>
          <img src={tickIcon} alt="Tick icon" />
        </div>
      )}
      {/*  showing error img  */}
      {status.includes("error") && (
        <div className={s.notify_circle_error}>
          <img src={crossIcon} alt="Cross icon" />
        </div>
      )}
      <p className={s.notify_desc}>
        {/* showing transaction in process messages */}
        {(() => {
          switch (isLoadingTransaction) {
            case "approve_loading":
              return (
                <>
                  Approving{" "}
                  <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
                  <span className={s.notify_string}>before Staking</span>
                </>
              );
            case "stake_loading":
              return (
                <>
                  Adding <span className={s.notify_accent}>{tokenAmount}</span>{" "}
                  STRU to Staking
                </>
              );

            default:
              return;
          }
        })()}
        {/* showing error and success messages */}
        {(() => {
          switch (status) {
            case "success_approve":
              return (
                <>
                  <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
                  successfully approved
                </>
              );
            case "success_stake":
              return (
                <>
                  <span className={s.notify_accent}>{tokenAmount} STRU </span>{" "}
                  STRU successfully{" "}
                  <span className={s.notify_string}>added to Staking</span>
                </>
              );
            case "error":
              return (
                <>
                  <span className={s.notify_accent}>
                    Connection Error<span className={s.notify_dot}>. </span>
                  </span>
                  <span className={s.notify_string}>Please try again</span>
                </>
              );
            default:
              return;
          }
        })()}
      </p>
    </div>
  );
};
