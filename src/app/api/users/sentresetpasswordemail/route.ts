import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    await sendEmail({ email, emailType: "RESET", userId });

    return NextResponse.json({
      message: "Reset password email sent successfully",
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
