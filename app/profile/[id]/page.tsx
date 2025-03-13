"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { ProfileHeader } from "@/components/ProfileHeader";
import { CountdownGrid } from "@/components/CountdownGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/Loader";

export default function PublicProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [countdowns, setCountdowns] = useState([]);
  const [activeTab, setActiveTab] = useState("countdowns");

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/users/${id}`);
      const userData = await response.json();
      setUser(userData);

      if (userData.countdowns && userData.countdowns.length > 0) {
        fetchUserCountdowns(userData.countdowns);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserCountdowns = async (countdownIds: { id: string }[]) => {
    try {
      const countdownsData: any = await Promise.all(
        countdownIds.map(async (count: { id: string }) => {
          const response = await fetch(`/api/countdowns/${count.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      );
      const now = new Date().getTime();
      const filtered = countdownsData.filter(
        (countdown: any) =>
          countdown.isPublic && new Date(countdown.date).getTime() > now
      );

      setCountdowns(filtered);
    } catch (error) {
      console.error("Error fetching countdowns:", error);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <Layout>
      <ProfileHeader
        user={{
          ...user,
          joinDate: new Date(user.dateCreated).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
        }}
        isOwnProfile={false}
        onEditProfile={() => {}}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="countdowns">Countdowns</TabsTrigger>
              </TabsList>
              <TabsContent value="countdowns">
                <CountdownGrid countdowns={countdowns} isOwnProfile={false} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
