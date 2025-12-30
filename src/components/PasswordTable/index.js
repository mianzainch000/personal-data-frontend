"use client";
import axios from "axios";
import Loader from "../Loader";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";
import handleAxiosError from "../HandleAxiosError";
import { useSnackbar } from "@/components/Snackbar";

export default function PasswordTable({
  data,
  setEditData,
  refreshData,
  loading,
}) {
  const showAlertMessage = useSnackbar();
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`password/api/${deleteId}`);
      if (res.status === 200) {
        showAlertMessage({ message: res.data.message, type: "success" });
        if (typeof refreshData === "function") await refreshData();
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const filteredData = data.filter((row) =>
    row.appName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {loading && <Loader />}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Confirmation"
        message="Are you sure you want to delete this password?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <div
        style={{
          background: "var(--bg-color)",
          color: "var(--text-color)",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <input
          type="text"
          placeholder="Search by App Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />

        <div style={tableWrapperStyle}>
          {/* Desktop Table */}
          <table style={tableStyle} className="desktop-table">
            <thead style={{ background: "var(--link-bg)" }}>
              <tr>
                <th style={thStyle}>📱 App</th>
                <th style={thStyle}>📧 Email</th>
                <th style={thStyle}>👤 Username</th>
                <th style={thStyle}>🔑 Password</th>
                <th style={thStyle}>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row._id} style={trHover}>
                    <td style={tdStyle}>{row.appName}</td>
                    <td style={tdStyle}>{row.email}</td>
                    <td style={tdStyle}>{row.username}</td>
                    <td style={tdStyle}>{row.password}</td>
                    <td style={tdStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() => setEditData(row)}
                          style={btnEdit}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(row._id);
                            setShowDeleteModal(true);
                          }}
                          style={btnDelete}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ ...tdStyle, textAlign: "center" }}>
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="mobile-cards">
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <div key={row._id} style={mobileCardStyle}>
                  <p>
                    <strong>📱 App:</strong> {row.appName}
                  </p>
                  <p>
                    <strong>📧 Email:</strong> {row.email}
                  </p>
                  <p>
                    <strong>👤 Username:</strong> {row.username}
                  </p>
                  <p>
                    <strong>🔑 Password:</strong> {row.password}
                  </p>
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "8px" }}
                  >
                    <button onClick={() => setEditData(row)} style={btnEdit}>
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(row._id);
                        setShowDeleteModal(true);
                      }}
                      style={btnDelete}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No results found</p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-table {
            display: none;
          }
          .mobile-cards {
            display: block;
          }
        }
        @media (min-width: 769px) {
          .desktop-table {
            display: table;
          }
          .mobile-cards {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

// Styles
const searchStyle = {
  width: "100%",
  padding: "12px",
  margin: "1rem 0",
  fontSize: "1rem",
  outline: "none",
  maxWidth: "400px",
  borderRadius: "8px",
  color: "var(--text-color)",
  background: "var(--link-bg)",
  border: "1px solid var(--link-hover-bg)",
  boxSizing: "border-box",
};

const tableWrapperStyle = {
  overflowX: "auto",
  borderRadius: "10px",
  boxShadow: "var(--card-shadow)",
};

const tableStyle = {
  width: "100%",
  textAlign: "center",
  borderCollapse: "collapse",
  minWidth: "600px",
};

const thStyle = {
  padding: "12px",
  fontWeight: "bold",
  textAlign: "center",
  border: "1px solid #ccc",
};

const tdStyle = {
  padding: "10px",
  textAlign: "center",
  verticalAlign: "middle",
  border: "1px solid #ccc",
};

const trHover = {
  transition: "background 0.3s",
};

const btnEdit = {
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
  padding: "6px 12px",
  textAlign: "center",
  borderRadius: "6px",
  transition: "transform 0.2s, opacity 0.2s",
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
};

const btnDelete = {
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "500",
  padding: "6px 12px",
  borderRadius: "6px",
  textAlign: "center",
  transition: "transform 0.2s, opacity 0.2s",
  background: "linear-gradient(90deg, #f43f5e, #e11d48)",
};

const mobileCardStyle = {
  padding: "1rem",
  borderRadius: "10px",
  marginBottom: "1rem",
  background: "var(--link-bg)",
  color: "var(--text-color)",
  boxShadow: "var(--card-shadow)",
};
