import { cookies } from "next/headers";
import PasswordTable from "@/components/Table";

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

    // Sample data (server side)
    const initialData = [
        {
            app: "Mobile",
            email: "mianzainch000@gmail.com",
            password: "zainch26191438211",
        },
        {
            app: "Laptop",
            email: "zainishfaq081@gmail.com",
            password: "1234432112344321",
        },
        {
            app: "Linkdin",
            email: "mianzainch000@gmail.com",
            password: "Zainch211!@#",
        },
        { app: "Rozze", email: "mianzainch000@gmail.com", password: "Zainch211!@" },
        {
            app: "ChatGPT",
            email: "mianzainch000@gmail.com",
            password: "Zainch211@",
        },
        {
            app: "Gramerly",
            email: "mianzainch000@gmail.com",
            password: "Zainch211!",
        },
        {
            app: "Overleaf",
            email: "mianzainch000@gmail.com",
            password: "Zainch211!@#$",
        },
        {
            app: "Github : username:(mianzainch000)",
            email: "mianzainch000@gmail.com",
            password: "ZainIshfaq211!",
        },
        {
            app: "Github : username:(zainishfaq081)",
            email: "zainishfaq081@gmail.com",
            password: "Zain23021999",
        },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>🔒 Secret Password Page</h1>
            <p>Only visible if you entered the correct Special Code at login.</p>

            {/* Client-side component */}
            <PasswordTable initialData={initialData} />
        </div>
    );
};
export default Password;
