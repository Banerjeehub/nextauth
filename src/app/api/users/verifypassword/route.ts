import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userIdString = user._id.toString(); // Convert ObjectId to string

    return NextResponse.json({
      message: "User verified",
      userId: userIdString,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
