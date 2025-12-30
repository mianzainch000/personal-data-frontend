"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "@/components/Loader";
import styles from "../../auth.module.css";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const LoginForm = () => {
  const router = useRouter();
  const showAlert = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    specialCode: "", // ✅ new field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login();
  };

  const Login = async () => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        specialCode: formData.specialCode,
        redirect: false,
      });

      if (res?.ok) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", res);

        showAlert({ message: "✅ Login successful", type: "success" });

        setFormData({ email: "", password: "", specialCode: "" });
        router.push("/screens/home");
      } else {
        showAlert({ message: `❌ ${res?.error}`, type: "error" });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlert({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.authContainer}>
        <div className={styles.card}>
          <h2 className={styles.title}>Login</h2>

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

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            {/* Secret Code */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Special Code</label>
              <input
                className={styles.input}
                type="password"
                name="specialCode"
                value={formData.specialCode}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.button}
              disabled={!formData.email || !formData.password}
            >
              Login
            </button>
          </form>

          <div className={styles.footer}>
            <Link href="/auth/forgotPassword">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
