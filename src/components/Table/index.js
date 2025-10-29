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
        showAlertMessage({ message, type: "error" });
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

      <div style={{ padding: "1rem", borderRadius: "10px" }}>
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
          }}
        />

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
    </>
  );
}

const thStyle = {
  padding: "10px",
  fontWeight: "bold",
  border: "1px solid #ccc",
};
const tdStyle = { padding: "10px", border: "1px solid #ccc" };
const btnEdit = {
  color: "#fff",
  border: "none",
  cursor: "pointer",
  padding: "5px 8px",
  marginRight: "5px",
  borderRadius: "5px",
  background: "#2563eb",
};
const btnDelete = {
  color: "#fff",
  border: "none",
  cursor: "pointer",
  padding: "5px 8px",
  borderRadius: "5px",
  background: "#e11d48",
};
