"use client";
import axios from "axios";
import Form from "@/components/Form";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import MeterTabs from "@/components/MeterTabs";
import styles from "@/css/MeterRading.module.css";
import { useSnackbar } from "@/components/Snackbar";
import ConfirmModal from "@/components/ConfirmModal";
import handleAxiosError from "@/components/HandleAxiosError";

const MeterReadingClient = ({
  initialActiveTab = 0,
  initialCurrentPage = 1,
  initialYearFilter = "",
  initialMonthFilter = "",
  initialRowsPerPage = 4,
}) => {
  const [meters, setMeters] = useState([]);
  const [meterReading, setMeterReading] = useState([]);
  const [loading, setLoading] = useState(false);
  const showAlertMessage = useSnackbar();

  const [editData, setEditData] = useState(null);
  const [deleteConfig, setDeleteConfig] = useState({ id: null, type: null });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeMeterId, setActiveMeterId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("meterReading/api");
      const metersList = res?.data?.data || [];
      setMeters(metersList);

      if (metersList.length > 0) {
        const initialMeterId =
          metersList[initialActiveTab]?._id || metersList[0]._id;
        fetchDataReading(initialMeterId);
      }
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

  const fetchDataReading = async (meterId) => {
    if (!meterId) return;
    setActiveMeterId(meterId);
    setLoading(true);
    try {
      const res = await axios.get(
        `/categories/meterReading/meterReadingApi/${meterId}`,
      );
      setMeterReading(res.data.data || []);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message: message || "Fetch failed", type: "error" });
      setMeterReading([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    const { id, type } = deleteConfig;
    try {
      let res;
      if (type === "meter") {
        res = await axios.delete(`meterReading/api/${id}`);
      } else {
        res = await axios.delete(
          `/categories/meterReading/meterReadingApi/${id}`,
        );
      }

      const successMsg = res?.data?.message || "Deleted successfully";
      showAlertMessage({ message: successMsg, type: "success" });

      if (type === "meter") {
        // Meter delete ke baad list refresh aur pehla tab select
        await fetchData();
      } else {
        fetchDataReading(activeMeterId);
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message: message || "Delete failed", type: "error" });
    } finally {
      setShowDeleteModal(false);
      setDeleteConfig({ id: null, type: null });
    }
  };

  const handleUpdateReading = async (meterId, readingId, readingData) => {
    try {
      const res = await axios.put(
        `/categories/meterReading/meterReadingApi/${readingId}`,
        readingData,
      );
      const successMsg = res?.data?.message || "Reading Updated Successfully";
      showAlertMessage({ message: successMsg, type: "success" });
      fetchDataReading(meterId);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    }
  };

  const handleAddReading = async (meterId, readingData) => {
    try {
      const res = await axios.post(
        `/categories/meterReading/meterReadingApi/${meterId}`,
        readingData,
      );
      const successMsg = res?.data?.message || "Reading Added Successfully";
      showAlertMessage({ message: successMsg, type: "success" });
      fetchDataReading(meterId);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Confirm Delete"
        confirmText="Yes, Deleted"
        message={`Are you sure you want to delete this ${deleteConfig.type}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <div className={styles.wrapper}>
        <Form
          title={editData ? "Edit Meter" : "Add Meter"}
          fields={[
            {
              key: "meterName",
              label: "Meter Name",
              placeholder: "Enter meter name (e.g. Home, Shop)",
              required: true,
            },
            {
              key: "meterConsumerId",
              label: "Consumer ID",
              type: "number",
              placeholder: "Enter 10-digit Consumer ID",
              required: true,
            },
            {
              key: "meterReferenceNo",
              label: "Reference No",
              type: "number",
              placeholder: "Enter 14-digit Reference Number",
              required: true,
            },
          ]}
          initialData={editData}
          onSubmit={async (formData) => {
            try {
              let res;
              if (editData?._id) {
                res = await axios.put(
                  `meterReading/api/${editData._id}`,
                  formData,
                );
              } else {
                res = await axios.post("meterReading/api", formData);
              }
              const successMsg =
                res?.data?.message ||
                (editData?._id ? "Meter Updated" : "Meter Added");
              showAlertMessage({ message: successMsg, type: "success" });
              setEditData(null);
              fetchData();
            } catch (error) {
              const { message } = handleAxiosError(error);
              showAlertMessage({
                message: message || "Operation failed",
                type: "error",
              });
            }
          }}
          showInitially={!!editData}
          onCancelEdit={() => setEditData(null)}
        />

        {meters.length > 0 && (
          <MeterTabs
            metersData={meters}
            meterReadingData={meterReading}
            initialActiveTab={initialActiveTab}
            initialCurrentPage={initialCurrentPage}
            initialYearFilter={initialYearFilter}
            initialMonthFilter={initialMonthFilter}
            initialRowsPerPage={initialRowsPerPage}
            onEdit={(meter) => setEditData(meter)}
            onDelete={(id) => {
              setDeleteConfig({ id, type: "meter" });
              setShowDeleteModal(true);
            }}
            onAddReading={handleAddReading}
            onUpdateReading={handleUpdateReading}
            onDeleteReading={(mId, rId) => {
              setDeleteConfig({ id: rId, type: "reading" });
              setShowDeleteModal(true);
            }}
            onTabChangeFetch={fetchDataReading}
          />
        )}
      </div>
    </>
  );
};

export default MeterReadingClient;
