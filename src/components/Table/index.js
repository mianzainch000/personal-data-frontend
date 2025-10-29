"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import handleAxiosError from "../HandleAxiosError";
import Loader from "../Loader";

export default function PasswordTable() {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [getData, setGetData] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredData = getData?.filter((row) =>
    row.appName.toLowerCase().includes(search.toLowerCase()),
  );
  const getPersonalData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("password/api");
      console.log("eeeeeeeeeeeeeeeeeeeeee", res)

      setGetData(res?.data?.data)


    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersonalData()
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div
        style={{
          background: "var(--bg-color)",
          color: "var(--text-color)",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* 🔍 Search bar */}
        <input
          type="text"
          placeholder="Search by App Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            margin: "1rem 0",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid var(--link-hover-bg)",
            borderRadius: "8px",
            background: "var(--link-bg)",
            color: "var(--text-color)",
            outline: "none",
            fontSize: "1rem",
          }}
        />

        {/* ✅ Desktop Table */}
        {!isMobile ? (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                minWidth: "600px",
                borderCollapse: "collapse",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              <thead>
                <tr style={{ background: "var(--link-bg)" }}>
                  <th style={thStyle}>App</th>
                  <th style={thStyle}>📧 Email</th>
                  <th style={thStyle}>🧑 UserName</th>
                  <th style={thStyle}>🔑 Password</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{row.appName}</td>
                      <td style={{ ...tdStyle, ...textCell }}>{row.email}</td>
                      <td style={{ ...tdStyle, ...textCell }}>{row.username}</td>
                      <td style={{ ...tdStyle, ...textCell, fontWeight: "bold" }}>
                        {row.password}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ ...tdStyle, textAlign: "center" }}>
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // ✅ Mobile: Stylish Card View (Centered)
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
              alignItems: "center",
            }}
          >
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid var(--link-hover-bg)",
                    borderRadius: "12px",
                    padding: "1.2rem",
                    width: "100%",
                    maxWidth: "320px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    background:
                      "linear-gradient(135deg, var(--card-bg), var(--link-bg))",
                    boxShadow:
                      "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 18px rgba(0, 0, 0, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  <p style={cardText}>
                    <span style={cardLabel}>📱 App:</span> {row.app}
                  </p>
                  <p
                    style={{
                      ...cardText,
                      borderBottom: "1px solid var(--link-hover-bg)",
                      paddingBottom: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={cardLabel}>📧 Email:</span> {row.email}
                  </p>
                  <p style={cardText}>
                    <span style={cardLabel}>🔑 Password:</span>{" "}
                    <span style={{ fontWeight: "bold" }}>{row.password}</span>
                  </p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No results found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

const thStyle = {
  padding: "12px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  color: "var(--link-color)",
  border: "1px solid var(--link-hover-bg)",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid var(--link-hover-bg)",
};

const textCell = {
  maxWidth: "250px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const cardText = {
  margin: "8px 0",
  lineHeight: "1.4",
  fontSize: "0.95rem",
};

const cardLabel = {
  fontWeight: "600",
  color: "var(--link-color)",
};
