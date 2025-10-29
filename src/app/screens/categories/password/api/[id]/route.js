// 📁 src/app/screens/categories/password/api/[id]/route.js
import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

// ✅ 1. Backend call to delete by ID
export const deleteUser = async (id) => {
  try {
    const response = await axiosClient.delete(
      `${apiConfig.password.delete}/${id}`
    );
    return response;
  } catch (error) {
    console.error("Delete error:", error);
    return { status: 500, data: { message: "Delete failed" } };
  }
};

// ✅ 2. Next.js DELETE route (automatic param access)
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // URL se ID le rahe hain
    const data = await deleteUser(id);

    return new Response(JSON.stringify(data?.data), {
      status: data?.status || 200,
    });
  } catch (error) {
    console.error("Server delete error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
