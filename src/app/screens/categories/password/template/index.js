"use client";

import PasswordTable from "@/components/Table";
import PasswordForm from "@/components/PasswordForm";
import { useState } from "react";

const Password = () => {
    const [editData, setEditData] = useState(null);
    return (
        <div style={{ padding: "2rem" }}>
            <PasswordForm editData={editData} setEditData={setEditData} />
            <PasswordTable setEditData={setEditData} />
        </div>
    );
};

export default Password;
