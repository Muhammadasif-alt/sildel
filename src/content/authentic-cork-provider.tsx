"use client";

import { createContext, useContext } from "react";
import { authenticCork, type AuthenticCorkContent } from "./authentic-cork";

const AuthenticCorkContext = createContext<AuthenticCorkContent>(authenticCork);

export function AuthenticCorkProvider({
  data,
  children,
}: {
  data: AuthenticCorkContent;
  children: React.ReactNode;
}) {
  return (
    <AuthenticCorkContext.Provider value={data}>
      {children}
    </AuthenticCorkContext.Provider>
  );
}

export function useAuthenticCork(): AuthenticCorkContent {
  return useContext(AuthenticCorkContext);
}
