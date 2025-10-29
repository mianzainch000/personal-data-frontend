
import { cookies } from "next/headers";
import Password from "./template";
const PasswordPage = () => {
  const cookieStore = cookies();
  const access = cookieStore.get("showPasswordRoute");




  if (!access || access.value !== "true") {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        ❌ Access Denied – You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔒 Secret Password Page</h1>
      <p>Only visible if you entered the correct Special Code at login.</p>
      <Password />

    </div>
  );
};

export default PasswordPage;

export function generateMetadata() {
  return { title: "Passwords" };
}
