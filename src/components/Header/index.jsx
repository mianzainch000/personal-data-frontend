"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import ConfirmModal from "@/components/ConfirmModal"; // import modal

const Header = ({ initialTheme, initialFirstName, initialLastName }) => {
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
    window.location.href = "/";
  };

  return (
    <>
      <div className={styles.headerBar}>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <button onClick={() => setShowModal(true)} className={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <h2 className={styles.welcomeText}>
        Welcome {initialFirstName || "No user data"} {initialLastName || ""}
      </h2>

      {/* Confirm Modal */}
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
