import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export const postData = async (params) => {
  const { token, password } = params;

  return await axiosClient.post(apiConfig.resetPassword + `/?token=${token}`, {
    password,
  });
};

export async function POST(req) {
  const body = await req.json();
  const data = await postData(body);
  return new Response(JSON.stringify(data?.data), {
    status: data?.status,
  });
}
