import { Session, User } from "@supabase/gotrue-js";

export type authType = {
  session: Session | null | undefined;
  user: User | null | undefined;
};
