import React from "react";
import { cookies } from "next/headers";
import Header from "@/components/Header";

const Layout = ({ children }) => {
    const cookieStore = cookies();
    const theme = cookieStore.get("theme")?.value || "light";
    const firstName = cookieStore.get("firstName")?.value || null;
    const lastName = cookieStore.get("lastName")?.value || null;

    return (
        <>
            <div className="container">
                <Header
                    initialTheme={theme}
                    initialFirstName={firstName}
                    initialLastName={lastName}
                />
            </div>
            {children}
        </>
    );
};

export default Layout;
