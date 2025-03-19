"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import CountdownPreview from "@/components/CountdownPreview";
import { CountdownData } from "@/lib/countTypes";
import { UserTypes } from "@/lib/userTypes";
import NotFound from "@/components/NotFound";
import { Footer } from "@/components/Footer";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";

const CountdownPage = () => {
  const [countdownData, setCountdownData] = useState<CountdownData | null>(
    null
  );
  const [userData, setUserData] = useState<UserTypes | null>(null);
  const [currentUserData, setCurrentUserData] = useState<UserTypes>();
  const [exists, setExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status }: any = useSession();
  const pathname = usePathname();
  const countdownId = pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const countdownRes = await axios.get(`/api/countdowns/${countdownId}`);

        if (countdownRes.data) {
          setCountdownData(countdownRes.data);
          setExists(true);

          // Fetch user data
          const userRes = await axios.get(
            `/api/users/${countdownRes.data.createdBy}`
          );

          // Only try to fetch current user data if session exists and has a user
          if (userRes.data) {
            setUserData(userRes.data);
          }
        } else {
          setExists(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setExists(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (countdownId) {
      fetchData();
    }
  }, [countdownId]);

  // Add a separate useEffect for fetching the current user:

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (session?.user?.id) {
        try {
          const currentUserRes = await axios.get(
            `/api/users/${session.user.id}`
          );
          if (currentUserRes.data) {
            setCurrentUserData(currentUserRes.data);
          }
        } catch (userError) {
          console.error("Error fetching current user:", userError);
        }
      }
    };

    if (status === "authenticated") {
      fetchCurrentUser();
    }
  }, [session, status]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex-grow">
      <div className="flex flex-col min-h-screen">
        {exists && countdownData && userData ? (
          <>
            <CountdownPreview
              {...countdownData}
              createdBy={{
                id: userData.id || "",
                name: userData.name || "",
                image: userData.pfp || "",
              }}
              isFullPage={true}
              currentUser={currentUserData}
            />
          </>
        ) : (
          <NotFound message="Countdown Not Found" />
        )}
      </div>
      <Footer />
    </main>
  );
};

export default CountdownPage;
