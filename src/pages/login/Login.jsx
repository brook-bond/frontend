import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const { setUser, csrfToken } = useAuth();
  const [error, setError] = useState(null);
  const [isShown, setIsSHown] = useState(false);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const body = {
      email: email.value,
      password: password.value,
    };
    await csrfToken();
    try {
      const resp = await axios.post("/login", body);
      if (resp.status === 200) {
        setUser(resp.data.user);
        return <Navigate to="/profile" />;
      }
    } catch (error) {
      if (error.response.status === 422) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <section className={styles.mainCointainer}>
      <div className={styles.formContainer}>
        <a href="#" className={styles.logoLink}>
          <img
            className={styles.logo}
            src="https://picsum.photos/200"
            alt="logo"
          />
          My SHOP
        </a>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Sign in to your account</h1>
          {error && (
            <div className={styles.danger}>
              <svg
                aria-hidden="true"
                className={styles.dangerIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>{error}</div>
            </div>
          )}

          <form
            className={styles.form}
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className={styles.inputHolder}>
              <label htmlFor="email" className={styles.label}>
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.inp}
                placeholder="poxos@email.com"
              />
            </div>
            <div className={styles.inputHolder}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type={isShown ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                className={styles.inp}
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Sign in
            </button>
            <p className={styles.bottomText}>
              Don't have an account yet?{" "}
              <Link to="/register" className={styles.signUp}>
                Sign up
              </Link>
            </p>
            <div className={styles.checkboxWrapper}>
              <label htmlFor="checkbox" className={styles.checkboxText}>
                Show password?
              </label>
              <input
                id="checkbox"
                type="checkbox"
                checked={isShown}
                onChange={togglePassword}
                className={styles.checkBox}
              />
            </div>
          </form>
            <Link to="/" className={styles.backLink}>
              Back to List
            </Link>
        </div>
      </div>
    </section>
  );
}
