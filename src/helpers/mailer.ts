import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export async function sendEmail({ email, emailType, userId }: any) {
  //hash the userID

  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //send email using node-mailer
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOption = {
      from: "mrbanerjeeprofessional@gmail.com", // sender address
      to: email, // list of receivers
      subject: `${
        emailType === "VERIFY"
          ? "Verify your account: "
          : "Reset your password: "
      }</p>`,
      html: `<p>Hello,</p>
               Please  copy and paste the link below to ${
                 emailType === "VERIFY"
                   ? "Verify your account: "
                   : "Reset your password: "
               }</p>
               <p>${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "verifypassword"
      }?token=${hashedToken}</p>
               <p>If you didn't request this, you can safely ignore this email.</p>
               <p>Best regards,<br>Mr Banerjee</p>`,
    };

    const response = await transporter.sendMail(mailOption);
    return response;
  } catch (error: any) {
    console.log(error);
  }
}
