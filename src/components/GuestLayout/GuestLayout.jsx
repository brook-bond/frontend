import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./GuestLayout.module.css";

export default function GuestLayout() {
  const [isMobile, setisMobile] = useState(false);
  const { user } = useAuth();
  const toggleActiveClass = () => {
    setisMobile(!isMobile);
  };
  const removeActive = () => {
    setisMobile(false);
  };
  if (user) {
    return <Navigate to="/profile" />;
  }
  return (
    <>
          <nav className={`${styles.navbar}`}>
            {/* logo */}
            <a href="#home" className={`${styles.logo}`}>
              <img
                src="https://picsum.photos/200"
                className={styles.logoImg}
                alt="Logo"
              />
              My SHOP
            </a>

            <ul
              className={`${styles.navMenu} ${isMobile ? styles.active : ""}`}
            >
              <li onClick={removeActive}>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? styles.pushed : styles.navLink
                    }
                  >
                    Login
                  </NavLink>
              </li>
              <li onClick={removeActive}>
                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? styles.pushed : styles.navLink
                    }
                  >
                    Register
                  </NavLink>
              </li>
            </ul>

            <div
              className={`${styles.hamburger} ${isMobile ? styles.active : ""}`}
              onClick={toggleActiveClass}
            >
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
            </div>
          </nav>
      <Outlet />
    </>
  );
}
