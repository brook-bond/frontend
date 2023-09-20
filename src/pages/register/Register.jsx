import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Register.module.css";

export default function Register() {
  const { setUser, csrfToken } = useAuth();
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [imageError, setImageError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isShown, setIsSHown] = useState(false);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, image, password, cpassword } = e.target.elements;
    const body = {
      name: name.value,
      email: email.value,
      image: image.files[0],
      password: password.value,
      password_confirmation: cpassword.value,
    };
    await csrfToken();
    try {
      const resp = await axios.post("/register", body);
      if (resp.status === 200) {
        setUser(resp.data.user);
        return <Navigate to="/profile" />;
      }
    } catch (error) {
      if (error.response.status === 422) {
        if (error.response.data.errors.name) {
          setNameError(error.response.data.errors.name[0]);
        } else {
          setNameError("");
        }
        if (error.response.data.errors.email) {
          setEmailError(error.response.data.errors.email[0]);
        } else {
          setEmailError("");
        }
        if (error.response.data.errors.image) {
          console.log(error.response.data.errors.image);
          setImageError(error.response.data.errors.image[0]);
        } else {
          setImageError("");
        }
        if (error.response.data.errors.password) {
          setPasswordError(error.response.data.errors.password[0]);
        } else {
          setPasswordError("");
        }
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
          <h1 className={styles.title}>Create and account</h1>
          <form
            className={styles.form}
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className={styles.inputHolder}>
              <label htmlFor="image" className={styles.label}>
                Choose image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                placeholder="Choose image"
                className={styles.inp}
              />
              {imageError && <p className={styles.errorText}>{imageError}</p>}
            </div>
            <div className={styles.inputHolder}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={styles.inp}
                placeholder="Poxos Poxosyan"
              />
              {nameError && <span className={styles.errorText}>{nameError}</span>}
            </div>
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
              {emailError && <p className={styles.errorText}>{emailError}</p>}
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
              {passwordError && <p className={styles.errorText}>{passwordError}</p>}
            </div>
            <div className={styles.inputHolder}>
              <label htmlFor="cpassword" className={styles.label}>
                Confirm password
              </label>
              <input
                type={isShown ? "text" : "password"}
                name="cpassword"
                id="cpassword"
                placeholder="********"
                className={styles.inp}
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Create an account
            </button>
            <p className={styles.bottomText}>
              Already have an account?{" "}
              <Link to="/login" className={styles.signUp}>
                Login here
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
