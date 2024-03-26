import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });

    response.cookies.set("tokenOne", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return Response.json({
      message: "Something went wrong",
    });
  }
}
