import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <section className={styles.profileContainer}>
        <div className={styles.headerContainer}>
          <img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="" className={styles.profileImg} />

          <div className={styles.profileName}>{user.name} Profile</div>
        </div>

        <div className={styles.bodyContainer}>
          <h5 className={styles.userDetails}>
            Name: {user.name}
          </h5>
          <p className={styles.userDetails}>Email: {user.email}</p>
          <p className={styles.userDetails}>
            Created At: {user.created_at}
          </p>
        </div>
      </section>
    </>
  );
}
