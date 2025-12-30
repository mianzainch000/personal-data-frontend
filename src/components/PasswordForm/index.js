"use client";
import axios from "axios";
import Loader from "../Loader";
import { useState, useEffect } from "react";
import styles from "./PasswordForm.module.css";
import handleAxiosError from "../HandleAxiosError";
import { useSnackbar } from "@/components/Snackbar";

export default function PasswordForm({ editData, setEditData, refreshData }) {
  const showAlertMessage = useSnackbar();
  const [email, setEmail] = useState("");
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // ✅ Autofill form on edit

  useEffect(() => {
    if (editData) {
      setShowForm(true);
      setAppName(editData.appName);
      setEmail(editData.email);
      setUsername(editData.username);
      setPassword(editData.password);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (editData) {
        res = await axios.put(`password/api/${editData._id}`, {
          appName,
          email,
          username,
          password,
        });
      } else {
        res = await axios.post("password/api", {
          appName,
          email,
          username,
          password,
        });
      }

      if (res?.status === 200 || res?.status === 201) {
        showAlertMessage({
          message: res?.data?.message,
          type: "success",
        });

        // ✅ Refresh table instantly
        if (typeof refreshData === "function") await refreshData();

        // reset form
        setAppName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setEditData(null);
        setShowForm(false);
      } else {
        showAlertMessage({
          message: res?.data?.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        {!showForm && (
          <button
            className={styles.openButton}
            onClick={() => setShowForm(true)}
          >
            ➕ Add New Password
          </button>
        )}

        {showForm && (
          <div className={styles.overlay}>
            <div className={styles.formCard}>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
              >
                ✖
              </button>
              <h2>{editData ? "Edit App Details" : "Add App Details"}</h2>

              <form className={styles.form} onSubmit={handleSubmit}>
                <label>App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />

                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className={styles.submitButton}>
                  {editData ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
