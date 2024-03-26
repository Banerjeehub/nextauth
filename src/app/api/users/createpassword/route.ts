import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, userId } = reqBody;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found", success: false });
    }

    const salt = await bycryptjs.genSalt(10);
    const hashPassword = await bycryptjs.hash(password, salt);

    user.password = hashPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Password changed",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
