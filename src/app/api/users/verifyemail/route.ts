import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // if user dont exit
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.isVerified = true;

    await user.save();
    return NextResponse.json(
      { message: "Email verified!", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Could not verify email" },
      { status: 500 }
    );
  }
}
