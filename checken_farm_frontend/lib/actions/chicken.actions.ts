import { Chicken } from "@/types/chicken";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_CHICKEN_API_URL ||
  "http://localhost:4000/api/chickens";

export async function getChickens(): Promise<Chicken[]> {
  const res = await fetch(BACKEND_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch chickens");
  return res.json();
}

export async function addChicken(
  data: Omit<Chicken, "id" | "createdAt">,
): Promise<Chicken> {
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add chicken");
  return res.json();
}

export async function deleteChicken(id: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete chicken");
}
