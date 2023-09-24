import { Outlet, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import s from "./Operations.module.scss";
import { useEffect } from "react";
import { Notification } from "../Notification/Notification";

export const Operations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("stake");
  }, []);

  return (
    <section className={s.operations}>
      <div className={s.operations_wrapper}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <Notification />
      </div>
    </section>
  );
};
