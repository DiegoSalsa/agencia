"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface ActivePromo {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    originalPrice: number;
    remainingSlots: number;
    totalSlots: number;
    showBanner: boolean;
    showPopup: boolean;
    showPricingCard: boolean;
    bannerText: string | null;
    popupTitle: string | null;
    popupBody: string | null;
    formType: string;
    fixedSections: string[];
    endsAt: string | null;
}

interface PromoContextValue {
    promos: ActivePromo[];
    loading: boolean;
}

const PromoContext = createContext<PromoContextValue>({ promos: [], loading: true });

export function PromoProvider({ children }: { children: React.ReactNode }) {
    const [promos, setPromos] = useState<ActivePromo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/promotions/active")
            .then((r) => r.json())
            .then((data: ActivePromo[]) => {
                if (Array.isArray(data)) setPromos(data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <PromoContext.Provider value={{ promos, loading }}>
            {children}
        </PromoContext.Provider>
    );
}

export function usePromo() {
    return useContext(PromoContext);
}
