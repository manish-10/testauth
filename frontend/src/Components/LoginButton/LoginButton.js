import React from "react";
import styles from "./LoginButton.module.css";
function LoginButton() {
  return (
    <div className={styles.button_container}>
      <a className={styles.button_box} href="http://localhost:5000/auth/github">
        <img src="/assets/github.png" width="15%" height="70%" alt="github" />
        <div className={styles.button_text}>Sign in with Github</div>
      </a>

      <a
        href="http://localhost:5000/auth/google"
        className={styles.button_box1}
      >
        <img src="/assets/google.png" width="15%" height="70%" alt="github" />
        <div className={styles.button_text1}>Sign in with Google</div>
      </a>
      <a className={styles.button_box2}>
        <img src="/assets/linkedin.png" width="15%" height="70%" alt="github" />
        <div className={styles.button_text2}>Sign in with LinkedIn</div>
      </a>
    </div>
  );
}

export default LoginButton;
