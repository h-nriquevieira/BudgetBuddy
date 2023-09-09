import { supabase } from "../config/supabase";

export async function signUpWithEmail(email: string, password: string) {
  const res = await supabase.auth.signUp({ email, password });
  return res;
}

export async function signInWithEmail(email: string, password: string) {
  const res = await supabase.auth.signInWithPassword({ email, password });
  return res;
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function signInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function getUserInfo() {
  return (await supabase.auth.getUser()).data.user;
}
