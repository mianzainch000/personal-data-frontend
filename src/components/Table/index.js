"use client";
import axios from "axios";
import Loader from "../Loader";
import ConfirmModal from "../ConfirmModal";
import { useState, useEffect } from "react";
import handleAxiosError from "../HandleAxiosError";
import { useSnackbar } from "@/components/Snackbar";

export default function PasswordTable() {
  const showAlertMessage = useSnackbar();
  const [search, setSearch] = useState("");
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // GET API
  const getPasswords = async () => {
    setLoading(true);
    try {
      const res = await axios.get("password/api");
      setGetData(res?.data?.data || []);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // DELETE API
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`password/api/${deleteId}`);

      if (res.status === 200) {
        showAlertMessage({ message: res.data.message });
        setGetData((prev) => prev.filter((item) => item._id !== deleteId));
      } else {
        showAlertMessage({ message: "Error deleting record", type: "error" });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // FILTER DATA
  const filteredData = getData.filter((row) =>
    row.appName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {loading && <Loader />}

      {/* Confirm Modal */}
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
        {/* 🔍 Search bar */}
        <input
          type="text"
          placeholder="Search by App Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />

        {/* Responsive Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
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
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => alert(`Edit: ${row._id}`)}
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
        </div>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="mobile-table">
        {filteredData.length > 0 ? (
          filteredData.map((row) => (
            <div key={row._id} style={cardStyle}>
              <p><strong>📱 App:</strong> {row.appName}</p>
              <p><strong>📧 Email:</strong> {row.email}</p>
              <p><strong>👤 Username:</strong> {row.username}</p>
              <p><strong>🔑 Password:</strong> {row.password}</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button style={btnEdit}>✏️ Edit</button>
                <button
                  style={btnDelete}
                  onClick={() => {
                    setDeleteId(row._id);
                    setShowDeleteModal(true);
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            No results found
          </p>
        )}
      </div>

      {/* 🔧 Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          table {
            display: none;
          }
          .mobile-table {
            display: block;
          }
        }
        @media (min-width: 769px) {
          .mobile-table {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

const searchStyle = {
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
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "12px",
  fontWeight: "bold",
  border: "1px solid #ccc",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  verticalAlign: "middle",
};

const trHover = {
  transition: "background 0.3s",
  cursor: "pointer",
};

const btnEdit = {
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  padding: "6px 12px",
  borderRadius: "6px",
  fontWeight: "500",
  transition: "transform 0.2s, opacity 0.2s",
};

const btnDelete = {
  background: "linear-gradient(90deg, #f43f5e, #e11d48)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  padding: "6px 12px",
  borderRadius: "6px",
  fontWeight: "500",
  transition: "transform 0.2s, opacity 0.2s",
};

const cardStyle = {
  background: "var(--bg-color)",
  color: "var(--text-color)",
  borderRadius: "10px",
  boxShadow: "var(--card-shadow)",
  padding: "1rem",
  marginBottom: "1rem",
  border: "1px solid var(--link-hover-bg)",
};
