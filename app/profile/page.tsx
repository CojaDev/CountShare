"use client";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserTypes } from "@/lib/userTypes";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [users, setUsers] = useState<UserTypes[]>([]);

  useEffect(() => {
    if (!session) {
      window.location.href = "/login";
    }
  }, [session]);

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

  const user = users.find(
    (user: UserTypes) => user.email === session?.user?.email
  );

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <div className="p-1 size-32 flex justify-center items-center rounded-full mx-auto shadow bg-[#152932]">
                <div className="w-full h-full rounded-full bg-white shadow">
                  <img
                    src={user?.pfp || "https://picsum.photos/200"}
                    alt="Profile"
                    draggable="false"
                    className={`rounded-full  mx-auto mb-4 object-cover ${
                      user?.pfp?.includes("https://robohash.org/")
                        ? "w-32 h-32"
                        : "w-full h-full"
                    }`}
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
                <p className="text-gray-600 mt-2">
                  {user?.bio || "No bio added yet"}
                </p>
              </div>

              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800">User ID</h2>
                <p className="text-gray-600 mt-2">{user?.userID}</p>
              </div>

              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Member Since
                </h2>
                <p className="text-gray-600 mt-2">
                  {user?.dateCreated
                    ? new Date(user.dateCreated).toLocaleDateString()
                    : "Date not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
