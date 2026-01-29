"use client";
import axios from "axios";
import Loader from "../Loader";
import { useState, useEffect } from "react";
import ConfirmModal from "../ConfirmModal";
import handleAxiosError from "../HandleAxiosError";
import { useSnackbar } from "@/components/Snackbar";

// Drag and Drop Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// --- Sortable Row Component ---
function SortableRow({ row, setEditData, setDeleteId, setShowDeleteModal }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "var(--link-hover-bg)" : "transparent",
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      {/* Drag Handle Icon */}
      <td
        style={{ ...tdStyle, cursor: "grab", fontSize: "1.2rem" }}
        {...listeners}
      >
        ⠿
      </td>
      <td style={tdStyle}>{row.appName}</td>
      <td style={tdStyle}>{row.email}</td>
      <td style={tdStyle}>{row.username}</td>
      <td style={tdStyle}>{row.password}</td>
      <td style={tdStyle}>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <button
            onClick={() => setEditData(row)}
            style={{ ...btnEdit, flex: 1 }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              setDeleteId(row._id);
              setShowDeleteModal(true);
            }}
            style={{ ...btnDelete, flex: 1 }}
          >
            🗑️ Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

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
  const [items, setItems] = useState([]);

  // Data sync with local items
  useEffect(() => {
    setItems(data);
  }, [data]);

  // Sensors for Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // --- Handle Reordering and Sync with DB ---
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i._id === active.id);
      const newIndex = items.findIndex((i) => i._id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      // 1. Update UI Locally for instant feedback
      setItems(newItems);

      // 2. Call the Reorder API to save in DB
      try {
        const idList = newItems.map((item) => item._id);
        const res = await axios.put("password/api/reorder", {
          newOrderIds: idList,
        });

        if (res.status === 200) {
          showAlertMessage({
            message: "Order updated successfully",
            type: "success",
          });
        }
      } catch (error) {
        const { message } = handleAxiosError(error);
        showAlertMessage({
          message: "Failed to save order: " + message,
          type: "error",
        });
        // Error hone par purana data fetch karein takay UI reset ho jaye
        if (typeof refreshData === "function") await refreshData();
      }
    }
  };

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

  const filteredData = items.filter((row) =>
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

      <div style={containerStyle}>
        <input
          type="text"
          placeholder="Search by App Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />

        <div style={tableWrapperStyle}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table style={tableStyle} className="desktop-table">
              <thead style={{ background: "var(--link-bg)" }}>
                <tr>
                  <th style={{ ...thStyle, width: "50px" }}>Drag</th>
                  <th style={thStyle}>📱 App</th>
                  <th style={thStyle}>📧 Email</th>
                  <th style={thStyle}>👤 Username</th>
                  <th style={thStyle}>🔑 Password</th>
                  <th style={thStyle}>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                <SortableContext
                  items={filteredData.map((i) => i._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <SortableRow
                        key={row._id}
                        row={row}
                        setEditData={setEditData}
                        setDeleteId={setDeleteId}
                        setShowDeleteModal={setShowDeleteModal}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ ...tdStyle, textAlign: "center" }}
                      >
                        No results found
                      </td>
                    </tr>
                  )}
                </SortableContext>
              </tbody>
            </table>
          </DndContext>

          {/* Mobile View */}
          <div className="mobile-cards">
            {filteredData.map((row) => (
              <div key={row._id} style={mobileCardStyle}>
                <div style={mobileCardContent}>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>📱 App:</strong> {row.appName}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>📧 Email:</strong> {row.email}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>🔑 Pass:</strong> {row.password}
                  </div>
                </div>
                <div style={mobileCardActions}>
                  <button
                    onClick={() => setEditData(row)}
                    style={{ ...btnEdit, flex: 1 }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(row._id);
                      setShowDeleteModal(true);
                    }}
                    style={{ ...btnDelete, flex: 1 }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-table {
            display: none;
          }
          .mobile-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
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

// --- Styles ---
const containerStyle = {
  background: "var(--bg-color)",
  color: "var(--text-color)",
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: "var(--card-shadow)",
};
const tdStyle = {
  padding: "10px",
  textAlign: "center",
  verticalAlign: "middle",
  border: "1px solid #ccc",
};
const thStyle = {
  padding: "12px",
  fontWeight: "bold",
  border: "1px solid #ccc",
  textAlign: "center",
};
const btnEdit = {
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
  padding: "10px",
  borderRadius: "6px",
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
};
const btnDelete = {
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "500",
  padding: "10px",
  borderRadius: "6px",
  background: "linear-gradient(90deg, #f43f5e, #e11d48)",
};
const tableStyle = {
  width: "100%",
  textAlign: "center",
  borderCollapse: "collapse",
  minWidth: "600px",
};
const searchStyle = {
  width: "100%",
  padding: "12px",
  margin: "1rem 0",
  maxWidth: "400px",
  borderRadius: "8px",
  background: "var(--link-bg)",
  border: "1px solid var(--link-hover-bg)",
  color: "inherit",
};
const tableWrapperStyle = { overflowX: "auto", borderRadius: "10px" };

// Improved Mobile Styling
const mobileCardStyle = {
  padding: "16px",
  background: "var(--link-bg)",
  borderRadius: "12px",
  border: "1px solid #ccc",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};
const mobileCardContent = { fontSize: "0.95rem", color: "inherit" };
const mobileCardActions = { display: "flex", gap: "10px", width: "100%" };
