type SupabaseEnv = {
  url: string;
  anonKey: string;
  serviceRoleKey: string;
};

function getRequiredEnv(name: keyof NodeJS.ProcessEnv) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export function getSupabaseEnv(): SupabaseEnv {
  return {
    url: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    serviceRoleKey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  };
}

type SupabaseRequestOptions = {
  method?: "GET" | "POST" | "PATCH";
  body?: unknown;
  headers?: HeadersInit;
};

export async function supabaseRequest<T>(
  path: string,
  options: SupabaseRequestOptions = {},
) {
  const { url, anonKey, serviceRoleKey } = getSupabaseEnv();
  const headers = new Headers(options.headers);

  headers.set("apikey", anonKey);
  headers.set("Authorization", `Bearer ${serviceRoleKey}`);

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${url}/rest/v1${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : null;

  if (!response.ok) {
    throw new Error(
      `Supabase request failed (${response.status}): ${text || response.statusText}`,
    );
  }

  return data;
}
