"use client";
import axios from "axios";
import Loader from "../Loader";
import ConfirmModal from "../ConfirmModal";
import { useState, useEffect } from "react";
import handleAxiosError from "../HandleAxiosError";
import { useSnackbar } from "@/components/Snackbar";

export default function PasswordTable({ setEditData }) {
  const showAlertMessage = useSnackbar();
  const [search, setSearch] = useState("");
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`password/api/${deleteId}`);
      if (res.status === 200) {
        showAlertMessage({ message: res.data.message, type: "success", });
        setGetData((prev) => prev.filter((item) => item._id !== deleteId));
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

  const filteredData = getData.filter((row) =>
    row.appName.toLowerCase().includes(search.toLowerCase())
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

      <div style={containerStyle}>
        <input
          type="text"
          placeholder="Search by App Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />

        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
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
                  <tr key={row._id}>
                    <td style={tdStyle}>{row.appName}</td>
                    <td style={tdStyle}>{row.email}</td>
                    <td style={tdStyle}>{row.username}</td>
                    <td style={tdStyle}>{row.password}</td>
                    <td style={tdStyle}>
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={tdStyle}>
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Styles
const containerStyle = {
  background: "var(--bg-color)",
  color: "var(--text-color)",
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: "var(--card-shadow)",
};

const searchStyle = {
  padding: "12px",
  margin: "1rem 0",
  width: "100%",
  maxWidth: "400px",
  border: "1px solid var(--link-hover-bg)",
  borderRadius: "8px",
  background: "var(--link-bg)",
  color: "var(--text-color)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "10px",
  fontWeight: "bold",
  border: "1px solid #ccc",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  verticalAlign: "middle",
  textAlign: "center"
};

const btnEdit = {
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  padding: "6px 12px",
  borderRadius: "6px",
  marginRight: "5px",
  fontWeight: "500",
  transition: "0.3s",
};

const btnDelete = {
  background: "linear-gradient(90deg, #f43f5e, #e11d48)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  padding: "6px 12px",
  borderRadius: "6px",
  fontWeight: "500",
  transition: "0.3s",
};
