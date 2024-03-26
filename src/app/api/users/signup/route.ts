import Users from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await Users.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "user already exists" });
    }

    const salt = await bycryptjs.genSalt(10);
    const hashPassword = await bycryptjs.hash(password, salt);

    const newUser = await Users.create({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
