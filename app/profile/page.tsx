"use client";

import { useEffect, useState } from "react";
import { UserResponse } from "../api/auth/user/route";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentDateChecker from "@/components/payment-date-checker";
import { redirect } from "next/navigation";

const fetchUserProfile = async (): Promise<UserResponse | null> => {
  const response = await fetch("/api/auth/user", { method: "GET" });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      redirect("/");
    }
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch profile data.");
  }

  return await response.json();
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "",
    companyName: "",
    companyExpectedActivity: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
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
      setLoading(false);
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
              {loading ? (
                <>
                    <Skeleton className="h-5.5 w-1/4" />
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-5.5 w-1/4" />
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-5.5 w-1/4" />
                    <Skeleton className="h-7 w-full" />
                </>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" value={profileData.name} readOnly disabled />
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" type="text" value={profileData.companyName} readOnly disabled />
                  <Label htmlFor="company-expected-activity">Company Expected Activity</Label>
                  <Input id="company-expected-activity" type="text" value={profileData.companyExpectedActivity} readOnly disabled />
                </>
              )}
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