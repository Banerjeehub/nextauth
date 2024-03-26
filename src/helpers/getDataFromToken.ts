import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("tokenOne")?.value || "";
    const response: any = jwt.verify(token, process.env.SECRET!);
    return response.id;
  } catch (error) {
    return NextResponse.json(
      { message: "Error while working" },
      { status: 400 }
    );
  }
}
