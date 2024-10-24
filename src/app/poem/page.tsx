"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const [username, setUsername] = useState("Steve");

    useEffect(() => {
        if (userId) {
            const url = new URL('/api/getUser', window.location.origin);
            url.searchParams.append("id", userId);

            fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => res.json()).then((data) => {
                setUsername(data.username);
            });
        }
    }, [userId]);

    return (
        <div>
            <h1>Page</h1>
            <p>Welcome, {username}!</p>
        </div>
    );
}