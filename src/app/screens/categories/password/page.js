// app/screens/categories/password/page.js
import { cookies } from "next/headers";
import PasswordTable from "@/components/Table";

export default function PasswordPage() {
    const cookieStore = cookies();
    const access = cookieStore.get("showPasswordRoute");

    if (!access || access.value !== "true") {
        return (
            <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
                ❌ Access Denied – You are not authorized to view this page.
            </div>
        );
    }

    // Sample data (server side)
    const initialData = [
        { id: 1, app: "GitHub", email: "zain@example.com", password: "Gh@12345" },
        { id: 2, app: "LinkedIn", email: "zain.li@example.com", password: "Li!Pass987" },
        { id: 3, app: "Gmail", email: "zain.mail@example.com", password: "Gm#2025" },
        { id: 4, app: "Facebook", email: "zain.fb@example.com", password: "Fb@Pass321" },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>🔒 Secret Password Page</h1>
            <p>Only visible if you entered the correct Special Code at login.</p>

            {/* Client-side component */}
            <PasswordTable initialData={initialData} />
        </div>
    );
}
