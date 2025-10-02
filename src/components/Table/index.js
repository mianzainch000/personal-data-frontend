"use client";
import { useState } from "react";

export default function PasswordTable({ initialData }) {
    const [search, setSearch] = useState("");

    // ✅ Case-insensitive search by app name
    const filteredData = initialData.filter((row) =>
        row.app.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
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
                    border: "1px solid #ddd",
                    borderRadius: "5px",
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
                    <tr style={{ background: "#f5f5f5" }}>
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
                                <td style={tdStyle}>{row.password}</td>
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
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "bold",
};

const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
};
