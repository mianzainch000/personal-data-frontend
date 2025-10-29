import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";
export const postData = async (params) => {
  return await axiosClient.post(apiConfig.password.post, params);
};

export async function POST(req) {
  const body = await req.json();
  const data = await postData(body);
  return new Response(JSON.stringify(data?.data), {
    status: data?.status,
  });
}


export const getData = async () => {
  return await axiosClient.get(apiConfig.password.get);
};

export async function GET() {
  const data = await getData();

  return Response.json(data?.data);
}
