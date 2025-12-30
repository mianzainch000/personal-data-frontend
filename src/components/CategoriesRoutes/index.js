"use client";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Categories = () => {
  const [showPasswordRoute, setShowPasswordRoute] = useState(false);

  useEffect(() => {
    const hasAccess = getCookie("showPasswordRoute") === "true";
    setShowPasswordRoute(hasAccess);
  }, []);

  const categories = [
    { href: "categories/islamic-links", label: "Islamic Links" },
    { href: "categories/movie", label: "Movies Links" },
    { href: "categories/link", label: "Links + My Home Address" },
    { href: "categories/fesco", label: "Fesco" },
    { href: "categories/cv", label: "CV Download Kit" },
    { href: "categories/article", label: "Articles" },
    { href: "categories/video", label: "Videos Links" },
    { href: "categories/motorbike", label: "Motorbike" },
    { href: "categories/message", label: "Message Hr" },
    { href: "categories/interview", label: "Interviews" },
    { href: "categories/notes", label: "Notes" },
  ];

  if (showPasswordRoute) {
    categories.push({
      href: "categories/password",
      label: "Secret Password",
    });
  }

  return (
    <div className="categorie-container">
      <h2 className="categorie-heading">Mix Categories</h2>
      <div className="categorie-grid">
        {categories.map((item, index) => (
          <Link key={index} href={item.href} className="categorie-card">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
