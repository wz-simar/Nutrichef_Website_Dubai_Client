import type { ApiTemplate } from "@/lib/mealPlanTemplateDisplay";

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "";

function serverMenuListBase(): string | null {
  const proxy = process.env.BACKEND_PROXY_TARGET?.replace(/\/$/, "");
  if (proxy) return `${proxy}/api/v1`;

  const env = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (env?.startsWith("http")) return env;

  return null;
}

/** Template IDs for /meal-plans/[templateId] sitemap entries. Returns [] if API is unreachable. */
export async function fetchMealPlanTemplateIds(): Promise<string[]> {
  const base = serverMenuListBase();
  if (!base) return [];

  const headers: Record<string, string> = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420",
  };
  if (TENANT_ID) headers["X-Tenant-Id"] = TENANT_ID;

  try {
    const res = await fetch(`${base}/menu/list?type=templates`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as {
      data?: { templates?: ApiTemplate[] };
    };
    const templates = json.data?.templates ?? [];

    return templates
      .map((t) => t._id)
      .filter((id): id is string => typeof id === "string" && id.trim().length > 0);
  } catch {
    return [];
  }
}
