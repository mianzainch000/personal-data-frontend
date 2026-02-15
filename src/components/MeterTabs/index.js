"use client";
import Form from "@/components/Form";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import styles from "@/css/MeterRading.module.css";
import { exportToPDF } from "@/components/ExportPDF";

const MeterTabs = ({
  metersData = [],
  meterReadingData = [],
  initialActiveTab = 0,
  initialCurrentPage = 1,
  initialYearFilter = "",
  initialMonthFilter = "",
  initialRowsPerPage = 4,
  onEdit,
  onDelete,
  onAddReading,
  onUpdateReading,
  onDeleteReading,
  onTabChangeFetch,
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [yearFilter, setYearFilter] = useState(initialYearFilter);
  const [monthFilter, setMonthFilter] = useState(initialMonthFilter);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const [showReadingForm, setShowReadingForm] = useState(false);
  const [editReadingData, setEditReadingData] = useState(null);

  // Cookies Logic
  useEffect(() => {
    document.cookie = `activeTab=${activeTab}; path=/`;
  }, [activeTab]);
  useEffect(() => {
    document.cookie = `currentPage=${currentPage}; path=/`;
  }, [currentPage]);
  useEffect(() => {
    document.cookie = `yearFilter=${yearFilter}; path=/`;
  }, [yearFilter]);
  useEffect(() => {
    document.cookie = `monthFilter=${monthFilter}; path=/`;
  }, [monthFilter]);
  useEffect(() => {
    document.cookie = `rowsPerPage=${rowsPerPage}; path=/`;
  }, [rowsPerPage]);

  useEffect(() => {
    if (activeTab >= metersData.length) setActiveTab(0);
  }, [metersData]);

  const meter = metersData[activeTab] || {
    _id: "",
    meterConsumerId: "",
    meterReferenceNo: "",
  };

  // Filtering Logic
  let filteredData = meterReadingData || [];
  if (monthFilter) {
    filteredData = filteredData.filter((row) =>
      row?.month?.toLowerCase().includes(monthFilter.toLowerCase()),
    );
  }
  if (yearFilter) {
    filteredData = filteredData.filter((row) =>
      row?.month?.includes(yearFilter),
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const safeCurrentPage = currentPage > totalPages ? 1 : currentPage;
  const currentRows = filteredData.slice(
    (safeCurrentPage - 1) * rowsPerPage,
    safeCurrentPage * rowsPerPage,
  );

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
    setShowReadingForm(false);
    onTabChangeFetch(metersData[index]?._id);
  };

  // PDF Download Trigger
  const handleDownload = () => {
    const columns = [
      { key: "month", label: "Month" },
      { key: "reading", label: "Reading" },
      { key: "unit", label: "Units" },
      { key: "bill", label: "Bill Amount" },
    ];

    const extraInfo = {
      consumerId: meter.meterConsumerId,
      referenceNo: meter.meterReferenceNo,
    };

    exportToPDF(
      filteredData,
      columns,
      `${meter.meterName} - Bill Report`,
      `${meter.meterName}_Report`,
      extraInfo,
    );
  };

  return (
    <div className={styles.container}>
      {/* TABS */}
      <div className={styles.tabs}>
        {metersData.map((m, i) => (
          <button
            key={m._id || i}
            className={`${styles.tab} ${activeTab === i ? styles.active : ""}`}
            onClick={() => handleTabChange(i)}
          >
            {m.meterName || `Meter ${i + 1}`}
          </button>
        ))}
      </div>

      {/* CONSUMER INFO */}
      <div className={styles.consumerInfo}>
        <p>
          <strong>Consumer ID:</strong> {meter.meterConsumerId || "N/A"}
        </p>
        <p>
          <strong>Reference No:</strong> {meter.meterReferenceNo || "N/A"}
        </p>
        {meter._id && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              gap: "15px",
            }}
          >
            <span style={{ cursor: "pointer" }} onClick={() => onEdit(meter)}>
              ✏️
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onDelete(meter._id)}
            >
              🗑️
            </span>
          </div>
        )}
      </div>

      {/* ADD READING & PDF BUTTON */}
      {!showReadingForm && (
        <div className={styles.buttonGroup}>
          <Button variant="danger" onClick={handleDownload}>
            PDF Report 📄
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              setEditReadingData(null);
              setShowReadingForm(true);
            }}
          >
            ➕ Add Reading
          </Button>
        </div>
      )}

      {/* FORM */}
      {(showReadingForm || editReadingData) && (
        <Form
          title={
            editReadingData
              ? "Edit Reading"
              : `Add Reading for ${meter.meterName}`
          }
          fields={[
            {
              key: "month",
              label: "Month",
              placeholder: "Enter Month",
              required: true,
            },
            {
              key: "reading",
              label: "Reading",
              type: "number",
              placeholder: "Current Reading",
              required: true,
            },
            {
              key: "unit",
              label: "Units",
              type: "number",
              placeholder: "Total Units",
              required: true,
            },
            {
              key: "bill",
              label: "Bill Amount",
              type: "number",
              placeholder: "Total Bill",
              required: true,
            },
          ]}
          initialData={editReadingData}
          onSubmit={async (formData) => {
            if (editReadingData) {
              await onUpdateReading(meter._id, editReadingData._id, formData);
            } else {
              await onAddReading(meter._id, formData);
            }
            setShowReadingForm(false);
            setEditReadingData(null);
          }}
          onCancelEdit={() => {
            setShowReadingForm(false);
            setEditReadingData(null);
          }}
          showInitially={true}
        />
      )}

      {/* FILTERS */}
      <div className={styles.filters}>
        <select
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setCurrentPage(1);
          }}
          className={styles.filterSelect}
        >
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        <input
          type="text"
          placeholder="Filter month..."
          value={monthFilter}
          onChange={(e) => {
            setMonthFilter(e.target.value);
            setCurrentPage(1);
          }}
          className={styles.filterInput}
        />

        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className={styles.filterSelect}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Reading</th>
              <th>Unit</th>
              <th>Bill</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row._id}>
                  <td className={styles.td} data-label="Month">
                    {row.month}
                  </td>
                  <td className={styles.td} data-label="Reading">
                    {row.reading}
                  </td>
                  <td className={styles.td} data-label="Units">
                    {row.unit}
                  </td>
                  <td className={styles.td} data-label="Bill Amount">
                    {row.bill}
                  </td>
                  <td className={styles.td} data-label="Actions">
                    <span
                      style={{ cursor: "pointer", marginRight: 10 }}
                      onClick={() => setEditReadingData(row)}
                    >
                      ✏️
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => onDeleteReading(meter._id, row._id)}
                    >
                      🗑️
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          windowSize={2}
        />
      )}
    </div>
  );
};

export default MeterTabs;
