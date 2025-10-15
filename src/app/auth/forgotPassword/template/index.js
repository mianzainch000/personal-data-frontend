"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Loader from "@/components/Loader";
import styles from "../../auth.module.css";
import { apiConfig } from "@/config/apiConfig";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const ForgotPassword = () => {
  // hooks

  const showAlert = useSnackbar();

  // states

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ForgotPassword Api fnction call

    await ForgotPasswordApi();
  };

  const ForgotPasswordApi = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${apiConfig.baseUrl}${apiConfig.forgotPassword}`,
        { email: formData.email },
      );

      if (res?.status === 200) {
        showAlert({
          message: res?.data?.message,
          type: "success",
        });
        setFormData({
          email: "",
        });
      } else {
        showAlert({
          message: res?.data.message,
          type: "error",
        });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlert({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className={styles.authContainer}>
        <div className={styles.card}>
          <h2 className={styles.title}>Reset Link</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.button}
              disabled={!formData.email}
            >
              Verify
            </button>
          </form>

          {/* Footer */}
          <div className={styles.footer}>
            <Link href="/">Go to login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
