import { NavLink } from "react-router-dom";
import s from "./NavBar.module.scss";

export const NavBar = () => {
  const isActive = ({ isActive }) => (isActive ? "active_link" : "");

  return (
    <nav className={s.nav_bar}>
      <NavLink className={isActive} to="/stake">
        Stake
      </NavLink>
      <NavLink className={isActive} to="/withdraw">
        Withdraw
      </NavLink>
      <NavLink className={isActive} to="/claim-rewards">
        Claim rewards
      </NavLink>
    </nav>
  );
};
