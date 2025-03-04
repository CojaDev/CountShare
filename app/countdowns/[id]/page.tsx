"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import CountdownPreview from "@/components/CountdownPreview";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CountdownData } from "@/lib/countTypes";
import { UserTypes } from "@/lib/userTypes";
import NotFound from "@/components/NotFound";
import { Footer } from "@/components/Footer";

const CountdownPage = () => {
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [countdownData, setCountdownData] = useState<CountdownData | null>(
    null
  );
  const [userData, setUserData] = useState<UserTypes | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <main className="flex-grow">
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-center items-center min-h-screen">
            <p>Loading...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex-grow">
      <div className="flex flex-col min-h-screen">
        {exists && countdownData && userData ? (
          <>
            <CountdownPreview
              {...countdownData}
              createdBy={{ id: userData.id || "", name: userData.name || "" }}
              isFullPage={true}
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
