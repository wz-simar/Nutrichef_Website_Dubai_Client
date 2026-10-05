import { api } from "@/lib/api";

let inflight: Promise<unknown[]> | null = null;

/** One network call shared by the home plan carousel and the price checker. */
export function fetchPublicTemplates<T>(): Promise<T[]> {
  if (!inflight) {
    inflight = api
      .get<{ templates?: T[] }>("/menu/list?type=templates", { noAuth: true })
      .then((res) => res.data?.templates ?? [])
      .catch((err) => {
        inflight = null;
        throw err;
      });
  }
  return inflight as Promise<T[]>;
}
