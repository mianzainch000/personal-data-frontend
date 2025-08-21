"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/Snackbar";
import ConfirmModal from "@/components/ConfirmModal";
import { deleteCookie, setCookie } from "cookies-next";
const Header = ({ initialTheme, initialFirstName, initialLastName }) => {
  const router = useRouter();
  const showAlert = useSnackbar();
  const [theme, setTheme] = useState(initialTheme);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("theme", newTheme, { maxAge: 60 * 60 * 24 * 365 });
  };

  const handleLogout = () => {
    deleteCookie("sessionToken");
    deleteCookie("firstName");
    deleteCookie("lastName");
    showAlert({
      message: "✅ Logout successful",
      type: "success",
    });
    router.push("/");
  };

  return (
    <>
      <div className={styles.headerBar}>
        {/* Left: Logo */}
        <div className={styles.logo}>
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </Link>
        </div>

        {/* Center: Welcome Text */}
        <div className={styles.welcomeText}>
          Welcome {initialFirstName || "Guest"} {initialLastName || ""}
        </div>

        {/* Right: Theme + Logout */}
        <div className={styles.rightActions}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default Header;
