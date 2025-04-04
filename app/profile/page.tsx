"use client";

import { useEffect, useState } from "react";
import { UserResponse } from "../api/auth/user/route";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaymentDateChecker from "@/components/payment-date-checker";

const fetchUserProfile = async (): Promise<UserResponse | null> => {
  try {
    const response = await fetch("/api/auth/user", { method: "GET" });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch profile data.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "",
    companyName: "",
    companyExpectedActivity: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfileData = async () => {
      const data = await fetchUserProfile();

      if (data?.success) {
        setProfileData({
          name: data.user.full_name || "",
          companyName: data.user.Company.name || "",
          companyExpectedActivity: data.user.Company.expected_activity || "",
        });
      } else {
        setError("Failed to fetch profile data.");
      }
    };

    loadProfileData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10 px-4 max-w-lg">
        <header className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        </header>
        <main className="flex flex-col md:flex-row gap-8 mt-8 mb-8">
          <section className="flex-1">
            <div className="space-y-6">
              {error && <p className="text-red-500">{error}</p>}
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={profileData.name} readOnly disabled />
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" type="text" value={profileData.companyName} readOnly disabled />
              <Label htmlFor="companyExpectedActivity">Company Expected Activity</Label>
              <Input id="companyExpectedActivity" type="text" value={profileData.companyExpectedActivity} readOnly disabled />
            </div>
          </section>
        </main>
        <section>
          <PaymentDateChecker />
        </section>
      </div>
    </div>
  );
}
