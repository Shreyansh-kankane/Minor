'use client';
import { InitialModal } from "@/components/modals/inital-modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

async function isParking(session) {
  try {
    const res = await fetch("/api/parkingExist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
      }),
    });
    if (res.status === 200) {
      return await res.json();
    } 
    return null;
  } catch (error) {
    console.log(error);
  }
}

function SetUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [parking, setParking] = useState(null);

  useEffect(() => {
    async function parkingExist() {
      const yourParking = await isParking(session);
      setParking(yourParking.parking);
      setLoading(false);
    }
    parkingExist();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  if(parking == null) {
    return (<InitialModal />);
  }
  if(parking != null) {
    router.replace('/bookings');
  }
  return null;
}

export default SetUpPage;

