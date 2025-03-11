"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileSettings } from "@/components/ProfileSettings";
import { CountdownGrid } from "@/components/CountdownGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import Loader from "@/components/Loader";
export default function ProfilePage() {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [countdowns, setCountdowns] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("countdowns");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user) {
      fetchUserData();
    }
  }, [status, session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}`);
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
      setCountdowns(countdownsData);
    } catch (error) {
      console.error("Error fetching countdowns:", error);
    }
  };

  const handleSettingsSave = async (updatedUserData: any) => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      });
      if (response.ok) {
        setUser(updatedUserData);
        toast.success("Settings updated successfully!");
        setShowSettings(false);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleAccountDelete = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        signOut();
        toast({
          title: "Account deleted",
          description: "Your account has been successfully deleted.",
        });
        router.push("/");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCountdownEdit = (id: string) => {
    router.push(`/edit-countdown/${id}`);
  };

  const handleCountdownDelete = async (id: string) => {
    try {
      // Delete countdown
      const countdownResponse = await fetch(`/api/countdowns/${id}`, {
        method: "DELETE",
      });

      if (!countdownResponse.ok) {
        throw new Error(`HTTP error! status: ${countdownResponse.status}`);
      }

      // Update user's countdowns
      const userResponse = await fetch(
        `/api/users/${session?.user.id}/countdowns`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ countdownId: id }),
        }
      );

      if (!userResponse.ok) {
        throw new Error(`HTTP error! status: ${userResponse.status}`);
      }

      // Update local state
      setCountdowns(
        countdowns.filter((countdown: any) => countdown._id !== id)
      );
      setUser((prevUser: any) => ({
        ...prevUser,
        countdowns: prevUser.countdowns.filter(
          (c: { id: string }) => c.id !== id
        ),
      }));

      toast.success("Countdown deleted successfully");
    } catch (error) {
      console.error("Error deleting countdown:", error);
      toast.error("Failed to delete countdown. Please try again.");
    }
  };

  if (status === "loading" || !user) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
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
        isOwnProfile={true}
        onEditProfile={() => setShowSettings(true)}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="countdowns">Countdowns</TabsTrigger>
                </TabsList>
                <Button
                  onClick={() => router.push("/create-countdown")}
                  className="bg-[#00c2cb] hover:bg-[#00a7af] text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> New Countdown
                </Button>
              </div>
              <TabsContent value="countdowns">
                <CountdownGrid
                  countdowns={countdowns}
                  isOwnProfile={true}
                  onEdit={handleCountdownEdit}
                  onDelete={handleCountdownDelete}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <ProfileSettings
        user={user}
        isCredentialsUser={!user.password}
        onSave={handleSettingsSave}
        onDelete={handleAccountDelete}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </Layout>
  );
}
