import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export const deleteUser = async (id) => {
  try {
    const response = await axiosClient.delete(
      `${apiConfig.password.delete}/${id}`,
    );
    return response;
  } catch (error) {
    console.error("Delete error:", error);
    return { status: 500, data: { message: "Delete failed" } };
  }
};

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const data = await deleteUser(id);

    return new Response(JSON.stringify(data?.data), {
      status: data?.status || 200,
    });
  } catch (error) {
    console.error("Server delete error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export const updateExpense = async (id, data) => {
  return await axiosClient.put(`${apiConfig.password.update}/${id}`, data);
};

export async function PUT(req, { params }) {
  const body = await req.json();
  const response = await updateExpense(params.id, body);

  return new Response(JSON.stringify(response.data), {
    status: response.status,
  });
}
