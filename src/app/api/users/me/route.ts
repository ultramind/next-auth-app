import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { useId } from "react";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "user not foundd" }, { status: 404 });
    }
    return NextResponse.json({ message: "User found", success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: "Somethin wrong" }, { status: 500 });
  }
}
