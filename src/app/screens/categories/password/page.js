import { cookies } from "next/headers";
import PasswordTable from "@/components/Table";
import PasswordForm from "@/components/PasswordForm";

const Password = () => {
  const cookieStore = cookies();
  const access = cookieStore.get("showPasswordRoute");

  if (!access || access.value !== "true") {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        ❌ Access Denied – You are not authorized to view this page.
      </div>
    );
  }

  const initialData = [
    { app: "LinkedIn", email: "zain@gmail.com", password: "1234" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔒 Secret Password Page</h1>
      <p>Only visible if you entered the correct Special Code at login.</p>

      <PasswordForm />
      <PasswordTable initialData={initialData} />
    </div>
  );
};

export default Password;

export function generateMetadata() {
  return { title: "Passwords" };
}
