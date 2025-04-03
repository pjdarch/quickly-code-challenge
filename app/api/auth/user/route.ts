import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/lib/types/user";

export interface UserResponse {
  success: boolean;
  message: string;
  user: User;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      // This scenario is unlikely due to middleware, but we handle it defensively
      // to account for direct API access or unexpected middleware behavior.  
      return NextResponse.json(
        { error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const response = await fetch("https://api-dev.quicklyinc.com/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user data. Please try again later." },
        { status: response.status }
      );
    }

    const data: UserResponse = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { error: data.message || "An unknown error occurred." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: data.message, user: data.user });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
