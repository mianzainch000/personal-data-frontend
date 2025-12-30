import { cookies } from "next/headers";
import MeterTabs from "@/components/MeterTabs";
import styles from "@/app/screens/categories/fesco/fesco.module.css";
import { meter1, meter2 } from "@/app/screens/categories/fesco/MeterData";

const FESCO = () => {
  const cookieStore = cookies();
  const activeTab = cookieStore.get("activeTab")?.value || "meter1";
  const currentPage = parseInt(cookieStore.get("currentPage")?.value || "1");
  const yearFilter = cookieStore.get("yearFilter")?.value || "";
  const monthFilter = cookieStore.get("monthFilter")?.value || "";

  return (
    <div className={styles.container}>
      <MeterTabs
        meter1={meter1}
        meter2={meter2}
        initialActiveTab={activeTab}
        initialCurrentPage={currentPage}
        initialYearFilter={yearFilter}
        initialMonthFilter={monthFilter}
      />
    </div>
  );
};
export default FESCO;

export function generateMetadata() {
  return { title: "fesco" };
}
