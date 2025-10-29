"use client";
import { useState } from "react";
import styles from "./PasswordForm.module.css";

export default function PasswordForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    appName: "",
    email: "",
    username: "",
    password: "",
  });

  // 🔹 Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // ❌ Prevent page refresh
    console.log("Form Submitted:", formData);
    setShowForm(false); // Close form
    setFormData({ appName: "", email: "", username: "", password: "" }); // Reset fields
  };

  return (
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
                name="appName"
                value={formData.appName}
                onChange={handleChange}
                placeholder="e.g. LinkedIn"
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. zain@gmail.com"
              />

              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. zainishfaq"
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="e.g. ********"
              />

              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
