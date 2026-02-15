"use client";
import axios from "axios";
import Form from "@/components/Form";
import Table from "@/components/Table";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import styles from "@/css/Table.module.css";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import { useSnackbar } from "@/components/Snackbar";
import ConfirmModal from "@/components/ConfirmModal";
import { exportToPDF } from "@/components/ExportPDF";
import handleAxiosError from "@/components/HandleAxiosError";

const PasswordClientWrapper = () => {
  const showAlertMessage = useSnackbar();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    { key: "appName", label: "📱 App" },
    { key: "email", label: "📧 Email" },
    { key: "username", label: "👤 Username" },
    { key: "password", label: "🔑 Password" },
  ];

  // Data fetch karne ka function
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("password/api");
      setData(res?.data?.data || []);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Drag & Drop Reorder Logic (Fixed) ---
  const handleReorder = async (newItems) => {
    // 1. UI ko foran update karein taake row jump na kare (Optimistic Update)
    setData(newItems);

    try {
      const idList = newItems.map((item) => item._id);

      // 2. API hit karein (Check if your route.ts handles 'reorder' id)
      const res = await axios.put("password/api/reorder", {
        newOrderIds: idList,
      });

      const successMsg = res?.data?.message || "Order updated successfully";
      showAlertMessage({ message: successMsg, type: "success" });
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message: "Reorder failed: " + message,
        type: "error",
      });
      // 3. Error ki surat mein data wapis fetch karein taake original order aye
      fetchData();
    }
  };

  // Delete function
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`password/api/${deleteId}`);
      const successMsg = res?.data?.message || "Deleted successfully";
      showAlertMessage({ message: successMsg, type: "success" });
      fetchData();
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message: message || "Delete failed", type: "error" });
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Form submit logic (Add or Edit)
  const handleFormSubmit = async (formData) => {
    try {
      const res = editData
        ? await axios.put(`password/api/${editData._id}`, formData)
        : await axios.post("password/api", formData);

      const successMsg =
        res?.data?.message ||
        (editData ? "Updated successfully" : "Added successfully");

      showAlertMessage({ message: successMsg, type: "success" });
      fetchData();
      setEditData(null);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    }
  };

  // Search filter logic
  const filteredData = data.filter((row) =>
    row?.appName?.toLowerCase().includes(search.toLowerCase()),
  );

  // Jab search active ho toh drag & drop disable hona chahiye
  const isSearchActive = search.trim().length > 0;
  // PDF Export trigger
  const handleDownload = () => {
    if (filteredData.length === 0) {
      showAlertMessage({ message: "No data to export", type: "info" });
      return;
    }
    exportToPDF(
      filteredData,
      columns,
      "My Passwords Report",
      "Passwords_Backup",
    );
  };

  return (
    <>
      {loading && <Loader />}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Confirm Delete"
        confirmText="Yes, Delete"
        message="Are you sure you want to delete this password?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <Form
        title={"Add App"}
        setEditData={setEditData}
        fields={[
          {
            key: "appName",
            label: "App Name",
            placeholder: "e.g. Facebook, Gmail, Netflix",
            required: true,
          },
          {
            key: "email",
            label: "Email",
            type: "email",
            placeholder: "example@mail.com",
            required: false,
          },
          {
            key: "username",
            label: "Username",
            placeholder: "e.g. m_ahmed123",
            required: false,
          },
          {
            key: "password",
            label: "Password",
            placeholder: "Enter your secret password",
            required: false,
          },
        ]}
        initialData={editData}
        onSubmit={handleFormSubmit}
      />
      <br />

      <div className={styles.controlsWrapper}>
        <div className={styles.searchContainer}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search apps..."
          />
        </div>
        <Button
          variant="danger"
          onClick={handleDownload}
          className={styles.pdfButton}
        >
          PDF Report 📄
        </Button>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        onReorder={handleReorder}
        isSearchActive={isSearchActive} // Yeh prop drag disable karne ke liye hai
        renderActions={(row) => (
          <div
            style={{
              fontSize: "20px",
              display: "flex",
              gap: "30px",
              cursor: "pointer",
            }}
          >
            <div onClick={() => setEditData(row)}>✏️</div>
            <div
              onClick={() => {
                setDeleteId(row._id);
                setShowDeleteModal(true);
              }}
            >
              🗑️
            </div>
          </div>
        )}
      />
    </>
  );
};

export default PasswordClientWrapper;
