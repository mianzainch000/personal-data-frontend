import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

// GET All Readings of a Meter
export async function GET(req, { params }) {
  try {
    const { meterId } = params;

    const response = await axiosClient.get(
      `${apiConfig.meterReading.getMeterReading}/${meterId}`,
    );

    return Response.json({ success: true, data: response.data.data });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ADD Reading
export async function POST(req, { params }) {
  try {
    const { meterId } = params;
    const body = await req.json();

    const response = await axiosClient.post(
      `${apiConfig.meterReading.postMeterReading}/${meterId}`,
      body,
    );

    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ✅ UPDATE Reading
export async function PUT(req, { params }) {
  try {
    const { meterId } = params;
    const body = await req.json();

    const response = await axiosClient.put(
      `${apiConfig.meterReading.updateMeterReading}/${meterId}`,
      body,
    );

    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ✅ DELETE Reading
export async function DELETE(req, { params }) {
  try {
    const { meterId } = params;

    const response = await axiosClient.delete(
      `${apiConfig.meterReading.deleteMeterReading}/${meterId}`,
    );

    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
