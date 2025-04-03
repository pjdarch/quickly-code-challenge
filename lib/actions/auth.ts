"use server";

import { loginSchema } from "@/lib/schemas/auth";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedData = loginSchema.parse(rawData);

    const response = await fetch("https://api-dev.quicklyinc.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      return { error: "Email or Password Incorrect" };
    }

    const { success, message, token } = await response.json();
    if (!success) {
      return { error: message };
    }

    // Store token in cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 604800, // 1 week
    });

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred. Please try again later" };
  }
}
