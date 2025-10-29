"use client";
import axios from "axios";
import Loader from "../Loader";
import { useState } from "react";
import styles from "./PasswordForm.module.css";
import handleAxiosError from "../HandleAxiosError";
import { useSnackbar } from "@/components/Snackbar";

export default function PasswordForm() {
  const showAlertMessage = useSnackbar();
  const [email, setEmail] = useState("");
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("password/api", {
        appName,
        email,
        username,
        password,
      });

      // close form
      setShowForm(false);

      if (res?.status === 201) {
        showAlertMessage({
          message: res?.data?.message,
          type: "success",
        });

        // reset fields
        setAppName("");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        showAlertMessage({
          message:
            res?.data?.errors || res?.data?.message,
          type: "error",
        });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message: message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <button className={styles.openButton} onClick={() => setShowForm(true)}>
          ➕ Add New Password
        </button>

        {showForm && (
          <div className={styles.overlay}>
            <div className={styles.formCard}>
              <button
                className={styles.closeButton}
                onClick={() => setShowForm(false)}
              >
                ✖
              </button>
              <h2>Add App Details</h2>

              <form className={styles.form} onSubmit={handleSubmit}>
                <label>App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="e.g. LinkedIn"
                />

                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. zain@gmail.com"
                />

                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. zainishfaq"
                />

                <label>Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="1234"
                />

                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
