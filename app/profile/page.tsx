"use client";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserTypes } from "@/lib/userTypes";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [users, setUsers] = useState<UserTypes[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const user = users.find((user) => user.email === session?.user?.email);

  if (!user) {
    return <div>User not found</div>;
  }
  if (!session) {
    redirect("/login");
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <img
                src={user.pfp || "https://picsum.photos/200"}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
                <p className="text-gray-600 mt-2">
                  {user.bio || "No bio added yet"}
                </p>
              </div>

              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800">User ID</h2>
                <p className="text-gray-600 mt-2">{user.userID}</p>
              </div>

              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Member Since
                </h2>
                <p className="text-gray-600 mt-2">
                  {new Date(user.dateCreated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
