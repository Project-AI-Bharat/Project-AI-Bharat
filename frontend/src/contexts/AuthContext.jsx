import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContextValue.js";

const API_BASE_URL =
import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const TOKEN_KEY = "ai_bharat_access_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [isAuthReady, setIsAuthReady] = useState(false);

  const persistToken = useCallback((token) => {
    setAccessToken(token || null);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.accesstoken) {
        persistToken(null);
        return false;
      }

      persistToken(data.accesstoken);
      return true;
    } catch {
      persistToken(null);
      return false;
    }
  }, [persistToken]);

  const request = useCallback(
    async (endpoint, options = {}, retry = true) => {
      const doFetch = () => {
        const token = localStorage.getItem(TOKEN_KEY);

        return fetch(`${API_BASE_URL}${endpoint}`, {
          credentials: "include",
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
          },
        });
      };

      let response = await doFetch();

      if (response.status === 401 && retry && (await refreshToken())) {
        response = await doFetch();
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Authentication request failed");
      }

      return data;
    },
    [refreshToken]
  );

  const login = useCallback(
    async (mode, payload) => {
      const endpoint =
        mode === "Sign up"
          ? "/api/auth/register"
          : "/api/auth/login";

      const data = await request(
        endpoint,
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        false
      );

      if (data.accesstoken) {
        persistToken(data.accesstoken);
      }

      setUser(data.user ?? null);
      return data;
    },
    [request, persistToken]
  );

  const verifyEmail = useCallback(
    async (payload) => {
      const data = await request(
        "/api/auth/verify-email",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        false
      );

      setUser(data.user ?? null);
      return data;
    },
    [request]
  );

  const logout = useCallback(async () => {
    try {
      await request("/api/auth/logout", { method: "POST" }, false);
    } finally {
      persistToken(null);
      setUser(null);
    }
  }, [persistToken, request]);

  const sendMessage = useCallback(
    async (message) => {
      return request("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
      });
    },
    [request]
  );

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        let token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
          const refreshed = await refreshToken();

          if (!refreshed) {
            return;
          }

          token = localStorage.getItem(TOKEN_KEY);
        }

        const data = await request("/api/auth/me");

        if (active) {
          setUser(data.user ?? null);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setIsAuthReady(true);
        }
      }
    }

    bootstrap();

    return () => {
      active = false;
    };
  }, [refreshToken, request]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken && user),
      isAuthReady,
      login,
      logout,
      verifyEmail,
      sendMessage,
    }),
    [
      accessToken,
      isAuthReady,
      login,
      logout,
      sendMessage,
      user,
      verifyEmail,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}