import s from "./Notification.module.scss";
import { MyContext } from "../../context/context";
import { fromWei } from "../../utils/mathHelpers";
import { useEffect } from "react";
import crossIcon from "../../assets/icons/cross.svg";
import tickIcon from "../../assets/icons/tick.svg";
// import loaderIcon from "../../assets/icons/loader.svg";

export const Notification = () => {
  const { status, setStatus, statusMessage, setStatusMessage, payload } =
    MyContext();

  const amount = fromWei(payload);

  // hook for closing notification
  useEffect(() => {
    if (status.includes("success") || status.includes("error")) {
      setTimeout(() => {
        setStatus("");
        setStatusMessage("");
      }, 5000);
    }
  }, [status]);

  return (
    <div className={s.notify}>
      {status.includes("loading") && (
        <div className={s.notify_loader}>
          {/* <img src={loaderIcon} alt="Tick icon" /> */}
        </div>
      )}
      {status.includes("success") && (
        <div className={s.notify_circle_success}>
          <img src={tickIcon} alt="Tick icon" />
        </div>
      )}
      {status.includes("error") && (
        <div className={s.notify_circle_error}>
          <img src={crossIcon} alt="Cross icon" />
        </div>
      )}

      <p className={s.notify_desc}>
        {(() => {
          switch (status) {
            case "approve_loading":
              return (
                <>
                  Approving{" "}
                  <span className={s.notify_accent}>{amount} STRU </span>{" "}
                  <span className={s.notify_string}>before Staking</span>
                </>
              );
            case "success_approve":
              return (
                <>
                  <span className={s.notify_accent}>{amount} STRU </span>{" "}
                  successfully approved
                </>
              );
            case "stake_loading":
              return (
                <>
                  Adding <span className={s.notify_accent}>{amount}</span> STRU
                  to Staking
                </>
              );
            case "success_stake":
              return (
                <>
                  <span className={s.notify_accent}>{amount} STRU </span> STRU
                  successfully{" "}
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
