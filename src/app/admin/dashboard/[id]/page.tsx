"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

/**
 * Legacy route redirect.
 * Old URL: /admin/dashboard/[id]
 * New URL: /admin/dashboard/briefings/[id]
 */
export default function LegacyBriefingRedirect() {
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        router.replace(`/admin/dashboard/briefings/${params.id}`);
    }, [params.id, router]);

    return (
        <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}