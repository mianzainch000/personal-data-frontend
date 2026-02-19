import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    // Agar ID "reorder" hai toh reorder function chalayein
    if (id === "reorder") {
      const res = await axiosClient.put(apiConfig.password.reorder, body);
      return new Response(JSON.stringify(res.data), { status: res.status });
    }

    // Warna normal update chalayein
    const res = await axiosClient.put(
      `${apiConfig.password.update}/${id}`,
      body,
    );
    return new Response(JSON.stringify(res.data), { status: res.status });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed", error }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const res = await axiosClient.delete(
    `${apiConfig.password.delete}/${params.id}`,
  );
  return new Response(JSON.stringify(res.data), { status: res.status });
}
