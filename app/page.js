import { createSupabaseServerClient } from "@/lib/supabase/server";

async function checkSupabaseConnection() {
  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.storage.listBuckets();

    if (!error) {
      return {
        ok: true,
        message: "Connected to Supabase successfully.",
      };
    }

    if (error.status === 401 || error.status === 403) {
      return {
        ok: true,
        message:
          "Connected to Supabase. Anon key has limited permissions for listing buckets.",
      };
    }

    return {
      ok: false,
      message: error.message,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown connection error",
    };
  }
}

export default async function Home() {
  const status = await checkSupabaseConnection();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-zinc-900">Supabase Connection</h1>
        <p className="mt-2 text-zinc-600">
          Project URL: <span className="font-mono text-sm">{process.env.API_URL}</span>
        </p>

        <div
          className={`mt-6 rounded-xl border p-4 ${
            status.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          <p className="text-sm font-medium">
            {status.ok ? "Status: Connected" : "Status: Not connected"}
          </p>
          <p className="mt-1 text-sm">{status.message}</p>
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          <p className="font-medium">Env keys currently used:</p>
          <p className="mt-2 font-mono">API_URL</p>
          <p className="font-mono">anon_public</p>
          <p className="font-mono">service_role (server-only)</p>
        </div>
      </main>
    </div>
  );
}
