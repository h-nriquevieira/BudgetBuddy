import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { getUserInfo } from "../../service/AuthServices";
import { User } from "@supabase/gotrue-js";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async () => {
      const currentUser = await getUserInfo();
      setUser(currentUser);
    });
  }, []);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
