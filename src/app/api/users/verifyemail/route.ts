import { connect } from "@/dbConfig/dbconfig";

import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/userModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    //console.log(token);

    const usr = await Users.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!usr) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    usr.verifyToken = undefined;
    usr.verifyTokenExpiry = undefined;
    usr.isVerified = true;
    await usr.save();
    //console.log(usr);

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
