export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  login: "login",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  password: {
    get: "get",
    post: "create",
    delete: "delete",
    update: "update",
    reorder: "reorder",
  },
  meterReading: {
    get: "getMeters",
    post: "createMeter",
    delete: "deleteMeter",
    update: "updateMeter",
    getMeterReading: "getMetersReading",
    postMeterReading: "createMeterReading",
    deleteMeterReading: "deleteMeterReading",
    updateMeterReading: "updateMeterReading",
  },
};
