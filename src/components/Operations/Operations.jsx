import { Outlet, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { NavBar } from "../NavBar/NavBar";
import s from "./Operations.module.scss";
import { useEffect } from "react";

export const Operations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("stake");
  }, []);

  return (
    <div className={s.operations}>
      <NavBar />
      <div className={s.operations_wrapper}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
