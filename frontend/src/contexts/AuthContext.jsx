import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (mode, payload) => {
    const endpoint = mode === "Sign up" ? "/api/auth/register" : "/api/auth/login";

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Authentication request failed");
    }

    setUser(data.user ?? null);
    return data;
  };

  const value = useMemo(
    () => ({
      user,
      login,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}