"use client";
import { useState } from "react";

export default function PasswordTable({ initialData }) {
    const [search, setSearch] = useState("");

    const filteredData = initialData.filter((row) =>
        row.app.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            style={{
                background: "var(--bg-color)",
                color: "var(--text-color)",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "var(--card-shadow)",
            }}
        >
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by App Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "10px",
                    margin: "1rem 0",
                    width: "100%",
                    maxWidth: "400px",
                    border: "1px solid var(--link-hover-bg)",
                    borderRadius: "6px",
                    background: "var(--link-bg)",
                    color: "var(--text-color)",
                    outline: "none",
                }}
            />

            {/* Table */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "1rem",
                }}
            >
                <thead>
                    <tr style={{ background: "var(--link-bg)" }}>
                        <th style={thStyle}>App</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{row.app}</td>
                                <td style={tdStyle}>{row.email}</td>
                                <td
                                    style={{
                                        ...tdStyle,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {row.password}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ ...tdStyle, textAlign: "center" }}>
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const thStyle = {
    padding: "12px",
    border: "1px solid var(--link-hover-bg)",
    textAlign: "left",
    fontWeight: "bold",
    color: "var(--link-color)",
};

const tdStyle = {
    padding: "10px",
    border: "1px solid var(--link-hover-bg)",
};
