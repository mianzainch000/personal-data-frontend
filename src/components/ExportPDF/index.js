import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
  data,
  columns,
  title = "Report",
  fileName = "Document",
  extraInfo = null,
) => {
  const doc = new jsPDF("l", "mm", "a4");

  const now = new Date();
  const downloadDate = now.toLocaleDateString();
  const downloadTime = now
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(title, 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${downloadDate} at ${downloadTime}`, 14, 28);

  if (extraInfo) {
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(`Consumer ID: ${extraInfo.consumerId}`, 14, 38);
    doc.text(`Reference No: ${extraInfo.referenceNo}`, 14, 44);
  }

  const cleanHeaders = columns.map((col) =>
    col.label.replace(/[^\x00-\x7F]/g, "").trim(),
  );

  const tableRows = data.map((item) =>
    columns.map((col) => {
      const val = item[col.key];
      return val !== undefined && val !== null && val !== "" ? val : "-";
    }),
  );

  autoTable(doc, {
    startY: extraInfo ? 50 : 35,
    head: [cleanHeaders],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [44, 62, 80],
      halign: "center",
      valign: "middle",
      fontSize: 10,
    },
    styles: {
      fontSize: 9,
      halign: "center",
      valign: "middle",
      overflow: "linebreak",
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: "auto" },
    },
    margin: { left: 14, right: 14 },
  });

  doc.save(`${fileName}_${new Date().getTime()}.pdf`);
};
