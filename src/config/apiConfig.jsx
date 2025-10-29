export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  password: {
    get: "get",
    post: "create",
    delete: "delete",
  },
};
