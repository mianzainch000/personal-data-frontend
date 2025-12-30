"use client";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next";
import Pagination from "@/components/Pagination";
import styles from "@/app/screens/categories/fesco/fesco.module.css";

const MeterTabs = ({
  meter1,
  meter2,
  initialActiveTab,
  initialCurrentPage,
  initialYearFilter,
  initialMonthFilter,
}) => {
  const meters = ["meter1", "meter2"];

  // 🔹 Global state for filters & pagination
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [yearFilter, setYearFilter] = useState(initialYearFilter);
  const [monthFilter, setMonthFilter] = useState(initialMonthFilter);

  const rowsPerPage = 5;
  const meter = activeTab === "meter1" ? meter1 : meter2;

  // 🔹 Apply filters
  let data = meter.data;
  if (monthFilter)
    data = data.filter((row) =>
      row.month.toLowerCase().startsWith(monthFilter.toLowerCase()),
    );
  if (yearFilter) data = data.filter((row) => row.month.includes(yearFilter));

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // 🔹 Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCookie("activeTab", tab, { maxAge: 60 * 60 * 24 * 7 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCookie("currentPage", page, { maxAge: 60 * 60 * 24 * 7 });
  };

  const handleYearChange = (e) => {
    setYearFilter(e.target.value);
    setCookie("yearFilter", e.target.value, { maxAge: 60 * 60 * 24 * 7 });
    setCurrentPage(1);
    setCookie("currentPage", 1, { maxAge: 60 * 60 * 24 * 7 });
  };

  const handleMonthChange = (e) => {
    setMonthFilter(e.target.value);
    setCookie("monthFilter", e.target.value, { maxAge: 60 * 60 * 24 * 7 });
    setCurrentPage(1);
    setCookie("currentPage", 1, { maxAge: 60 * 60 * 24 * 7 });
  };

  return (
    <>
      {/* Tabs */}
      <div className={styles.tabs}>
        {meters.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab === "meter1" ? "Meter 1" : "Meter 2"}
          </button>
        ))}
      </div>

      {/* Consumer Info */}
      <div className={styles.consumerInfo}>
        <p>
          <strong>Consumer ID:</strong> {meter.consumerId}
        </p>
        <p>
          <strong>Reference No:</strong> {meter.referenceNo}
        </p>
        <Link
          href={"https://bill.pitc.com.pk/fescobill"}
          target="_blank"
          className={styles.link}
        >
          FESCO Web
        </Link>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <select
          value={yearFilter}
          onChange={handleYearChange}
          className={styles.filterSelect}
        >
          <option value="">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        <input
          type="text"
          placeholder="Filter by month"
          value={monthFilter}
          onChange={handleMonthChange}
          className={styles.filterInput}
        />
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Meter Reading</th>
              <th>Units</th>
              <th>Bill</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, i) => (
                <tr key={i}>
                  <td data-label="Month">{row.month}</td>
                  <td data-label="Meter Reading">{row.reading}</td>
                  <td data-label="Units">{row.units}</td>
                  <td data-label="Bill">{row.bill}</td>
                </tr>
              ))
            ) : (
              <tr className={styles.noDataRow}>
                <td colSpan="4">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        windowSize={2}
      />
    </>
  );
};

export default MeterTabs;
