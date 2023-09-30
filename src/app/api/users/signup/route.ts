import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/sendMails";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// connect db
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User alreaady exist" },
        { status: 404 }
      );
    }

    //   hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    // sending the verifiy email
    await sendEmail({
      email: newUser.email,
      emailType: "VERIFY",
      userId: newUser._id,
    });
    return NextResponse.json({
      message: "User Created Successfuly",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
