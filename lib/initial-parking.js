import { getSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const initialParking = async (req) => {
    const session = await getSession(authOptions);
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
}
