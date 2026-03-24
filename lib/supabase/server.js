import { createClient } from "@supabase/supabase-js";

function getEnvVar(primaryName, fallbackName) {
  return process.env[primaryName] ?? process.env[fallbackName];
}

function requiredEnvVar(primaryName, fallbackName) {
  const value = getEnvVar(primaryName, fallbackName);

  if (!value) {
    throw new Error(
      `Missing Supabase environment variable: ${primaryName} (or ${fallbackName})`
    );
  }

  return value;
}

export function createSupabaseServerClient() {
  const supabaseUrl = requiredEnvVar("API_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = requiredEnvVar(
    "anon_public",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createSupabaseServiceRoleClient() {
  const supabaseUrl = requiredEnvVar("API_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requiredEnvVar(
    "service_role",
    "SUPABASE_SERVICE_ROLE_KEY"
  );

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
