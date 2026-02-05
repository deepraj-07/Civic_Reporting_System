// lib/auth.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import { useRouter } from "next/navigation";

type User = { id: string; name?: string | null; email?: string | null; role?: "USER" | "ADMIN" | string };

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        const res = await api.post("/auth/login", { email, password });
        setUser(res.data.user);
        setLoading(false);

        // Route based on user role
        if (res.data.user.role === "ADMIN") {
            router.push("/admin");
        } else {
            router.push("/dashboard");
        }
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
        router.push("/");
    };

    return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
