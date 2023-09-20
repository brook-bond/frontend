import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./ProtectedLayout.module.css";

export default function DefaultLayout() {
  const [isMobile, setisMobile] = useState(false);
  const { user, setUser } = useAuth();
  const toggleActiveClass = () => {
    setisMobile(!isMobile);
  };
  const removeActive = () => {
    setisMobile(false);
  };
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("/user");
        if (resp.status === 200) {
          setUser(resp.data.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location.href = "/";
        }
      }
    })();
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleLogout = async () => {
    try {
      const resp = await axios.post("/logout");
      if (resp.status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
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

        <ul className={`${styles.navMenu} ${isMobile ? styles.active : ""}`}>
          <li onClick={removeActive}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? styles.pushed : styles.navLink
              }
            >
              Profile
            </NavLink>
          </li>
          <li onClick={removeActive}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? styles.pushed : styles.navLink
              }
            >
              About
            </NavLink>
          </li>
          <li onClick={removeActive}>
            <NavLink
              to="/productlist"
              className={({ isActive }) =>
                isActive ? styles.pushed : styles.navLink
              }
            >
              Product List
            </NavLink>
          </li>
          <li onClick={removeActive}>
            <NavLink
              to="/addproduct"
              className={({ isActive }) =>
                isActive ? styles.pushed : styles.navLink
              }
            >
              Add Product
            </NavLink>
          </li>
          <li>
            <a onClick={handleLogout} href="#" className={styles.navLink}>
              Logout
            </a>
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
