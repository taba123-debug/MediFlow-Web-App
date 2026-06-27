"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { resolveApiInput } from "@/lib/api";
import {
  clearStoredSession,
  fetchCurrentUser,
  loginRequest,
  logoutRequest,
  persistSession,
  readStoredSession,
  refreshTokenRequest,
  registerRequest,
  type AuthRole,
  type AuthTokens,
  type AuthUser,
  type RegisterPayload,
} from "@/lib/auth";

type LoginResult = {
  ok: boolean;
  message: string;
  role: AuthRole | null;
};

type AuthContextValue = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  role: AuthRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<LoginResult>;
  register: (
    role: "PATIENT" | "DOCTOR",
    payload: RegisterPayload,
  ) => Promise<{ ok: boolean; message: string }>;
  logout: () => Promise<void>;
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(
    () => readStoredSession()?.accessToken ?? null,
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    () => readStoredSession()?.refreshToken ?? null,
  );
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<AuthRole | null>(
    () => readStoredSession()?.role ?? null,
  );
  const [isLoading, setIsLoading] = useState(() => Boolean(readStoredSession()));
  const refreshPromiseRef = useRef<Promise<AuthTokens | null> | null>(null);

  function setSessionState(nextUser: AuthUser, nextRole: AuthRole, tokens: AuthTokens) {
    setUser(nextUser);
    setRole(nextRole);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    persistSession(tokens, nextRole);
  }

  function clearSessionState() {
    setUser(null);
    setRole(null);
    setAccessToken(null);
    setRefreshToken(null);
    clearStoredSession();
  }

  async function refreshSession(currentRefreshToken?: string | null) {
    const activeRefreshToken = currentRefreshToken || refreshToken;

    if (!activeRefreshToken) {
      return null;
    }

    if (!refreshPromiseRef.current) {
      refreshPromiseRef.current = (async () => {
        const response = await refreshTokenRequest(activeRefreshToken);

        if (!response.ok || !response.tokens) {
          clearSessionState();
          return null;
        }

        setAccessToken(response.tokens.accessToken);
        setRefreshToken(response.tokens.refreshToken);

        if (response.role) {
          setRole(response.role);
          persistSession(response.tokens, response.role);
        } else if (role) {
          persistSession(response.tokens, role);
        }

        if (response.user) {
          setUser(response.user);
        }

        return response.tokens;
      })().finally(() => {
        refreshPromiseRef.current = null;
      });
    }

    return refreshPromiseRef.current;
  }

  async function resolveCurrentUser(
    currentAccessToken: string,
    currentRefreshToken: string,
  ) {
    const response = await fetchCurrentUser(currentAccessToken);

    if (response.ok && response.user && response.role) {
      setSessionState(response.user, response.role, {
        accessToken: currentAccessToken,
        refreshToken: currentRefreshToken,
      });
      return response.user;
    }

    if (response.status !== 401) {
      return null;
    }

    const nextTokens = await refreshSession(currentRefreshToken);

    if (!nextTokens) {
      return null;
    }

    const retried = await fetchCurrentUser(nextTokens.accessToken);

    if (retried.ok && retried.user && retried.role) {
      setSessionState(retried.user, retried.role, nextTokens);
      return retried.user;
    }

    return null;
  }

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      return;
    }

    let cancelled = false;

    async function syncCurrentUser() {
      const currentUser = await resolveCurrentUser(accessToken, refreshToken);

      if (cancelled) {
        return;
      }

      if (!currentUser) {
        clearSessionState();
      }

      setIsLoading(false);
    }

    void syncCurrentUser();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refreshToken]);

  async function login(credentials: { email: string; password: string }) {
    const response = await loginRequest(credentials);

    if (!response.ok || !response.tokens) {
      return {
        ok: false,
        message: response.message,
        role: null,
      };
    }

    const meResponse = await fetchCurrentUser(response.tokens.accessToken);

    if (!meResponse.ok || !meResponse.user || !meResponse.role) {
      return {
        ok: false,
        message: meResponse.message || "Unable to load current user.",
        role: null,
      };
    }

    setSessionState(meResponse.user, meResponse.role, response.tokens);
    router.refresh();

    return {
      ok: true,
      message: response.message,
      role: meResponse.role,
    };
  }

  async function register(
    nextRole: "PATIENT" | "DOCTOR",
    payload: RegisterPayload,
  ) {
    const response = await registerRequest(nextRole, payload);

    return {
      ok: response.ok,
      message: response.message,
    };
  }

  async function logout() {
    const currentAccessToken = accessToken;

    clearSessionState();

    if (currentAccessToken) {
      try {
        await logoutRequest(currentAccessToken);
      } catch {
        // Local session is already cleared.
      }
    }

    router.push("/auth/login");
    router.refresh();
  }

  async function authFetch(input: RequestInfo | URL, init?: RequestInit) {
    const headers = new Headers(init?.headers);
    const resolvedInput = resolveApiInput(input);

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const response = await fetch(resolvedInput, {
      ...init,
      headers,
    });

    if (response.status !== 401) {
      return response;
    }

    const nextTokens = await refreshSession();

    if (!nextTokens) {
      return response;
    }

    const retryHeaders = new Headers(init?.headers);
    retryHeaders.set("Authorization", `Bearer ${nextTokens.accessToken}`);

    return fetch(resolvedInput, {
      ...init,
      headers: retryHeaders,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        role,
        isAuthenticated: Boolean(accessToken && user),
        isLoading,
        login,
        register,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
