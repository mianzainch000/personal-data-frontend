"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSnackbar } from "@/components/Snackbar";
import PasswordForm from "@/components/PasswordForm";
import PasswordTable from "@/components/PasswordTable";
import handleAxiosError from "@/components/HandleAxiosError";

export default function PasswordClientWrapper() {
  const showAlertMessage = useSnackbar();
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all passwords
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("password/api");
      setData(res?.data?.data || []);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PasswordForm
        editData={editData}
        setEditData={setEditData}
        refreshData={fetchData}
      />
      <PasswordTable
        data={data}
        setData={setData}
        setEditData={setEditData}
        refreshData={fetchData}
        loading={loading}
      />
    </>
  );
}
