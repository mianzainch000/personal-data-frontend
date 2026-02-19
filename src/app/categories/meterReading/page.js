import { cookies } from "next/headers";
import MeterReadingClient from "./template";

const Page = () => {
  const cookieStore = cookies();
  const activeTab = parseInt(cookieStore.get("activeTab")?.value || "0");
  const currentPage = parseInt(cookieStore.get("currentPage")?.value || "1");
  const yearFilter = cookieStore.get("yearFilter")?.value || "";
  const monthFilter = cookieStore.get("monthFilter")?.value || "";
  const rowsPerPage = parseInt(cookieStore.get("rowsPerPage")?.value || "4");
  const access = cookieStore.get("showMeterReadingRoute");

  if (!access || access.value !== "true") {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        ❌ Access Denied – You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <MeterReadingClient
        initialActiveTab={activeTab}
        initialCurrentPage={currentPage}
        initialYearFilter={yearFilter}
        initialMonthFilter={monthFilter}
        initialRowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default Page;
