import { cookies } from "next/headers";
import Header from "@/components/Header";
import styles from "@/css/Header.module.css";

const Layout = ({ children }) => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  const firstName = cookieStore.get("firstName")?.value || null;
  const lastName = cookieStore.get("lastName")?.value || null;

  return (
    <div className={styles.headerContainer}>
      <Header
        initialTheme={theme}
        initialFirstName={firstName}
        initialLastName={lastName}
      />

      {children}
    </div>
  );
};

export default Layout;
