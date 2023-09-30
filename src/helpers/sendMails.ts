import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4acca7f8360f25",
        pass: "d58737e4c047f7",
      },
    });

    const mailOptions = {
      from: "udechukwuakachukwu@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your email",
      html: `<p> Click the link below to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your email"
      } Your account. <br>
        <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>${
        emailType === "VERIFY" ? "Verify your email" : "Reset your email"
      }</a>
      <br> OR copy the link below <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailRespose = await transport.sendMail(mailOptions);
    NextResponse.json(mailRespose);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
