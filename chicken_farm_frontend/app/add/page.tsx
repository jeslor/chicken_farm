"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addChicken } from "@/lib/actions/chicken.actions";
import { ChickenType, ChickenStatus } from "@/types/chicken";
import Link from "next/link";

const BREEDS = [
  "Rhode Island Red",
  "Plymouth Rock",
  "Buff Orpington",
  "Leghorn",
  "Sussex",
  "Wyandotte",
  "Australorp",
  "Silkie",
  "Brahma",
  "Cochin",
  "Other",
];

export default function AddChickenPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    type: "hen" as ChickenType,
    color: "",
    ageWeeks: 12,
    weightKg: 1.5,
    status: "healthy" as ChickenStatus,
    notes: "",
    isNewborn: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.breed.trim()) e.breed = "Breed is required";
    if (!form.color.trim()) e.color = "Color is required";
    if (form.ageWeeks < 0) e.ageWeeks = "Age must be 0 or more";
    if (form.weightKg <= 0) e.weightKg = "Weight must be greater than 0";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    startTransition(async () => {
      await addChicken(form);
      setSubmitted(true);
      setTimeout(() => router.push("/"), 1500);
    });
  };

  const set = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-4 animate-bounce">🐔</div>
        <h2 className="text-3xl font-extrabold text-amber-900 mb-2">
          Welcome {form.name}!
        </h2>
        <p className="text-amber-600">
          Your new chicken has joined the flock. Redirecting…
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-6xl">🐔</span>
        <h2 className="text-3xl font-extrabold text-amber-900 mt-3">
          Add a Chicken
        </h2>
        <p className="text-amber-600 mt-1">
          Fill in the details to add a new member to your flock.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl border-2 border-amber-100 overflow-hidden"
      >
        <div className="bg-linear-to-r from-amber-400 to-orange-400 px-6 py-4">
          <p className="text-white font-bold text-sm uppercase tracking-widest">
            Chicken Details
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Name */}
          <FormField label="Chicken Name *" error={errors.name}>
            <input
              type="text"
              placeholder="e.g. Clucky, Roosty…"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="farm-input"
            />
          </FormField>

          {/* Breed */}
          <FormField label="Breed *" error={errors.breed}>
            <select
              value={form.breed}
              onChange={(e) => set("breed", e.target.value)}
              className="farm-input"
            >
              <option value="">Select a breed…</option>
              {BREEDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </FormField>

          {/* Type */}
          <FormField label="Type *">
            <div className="grid grid-cols-3 gap-3">
              {(["hen", "rooster", "chick"] as ChickenType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => set("type", t)}
                  className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    form.type === t
                      ? "bg-amber-600 text-white border-amber-600 shadow-md"
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400"
                  }`}
                >
                  {t === "hen"
                    ? "🐔 Hen"
                    : t === "rooster"
                      ? "🐓 Rooster"
                      : "🐥 Chick"}
                </button>
              ))}
            </div>
          </FormField>

          {/* Color */}
          <FormField label="Feather Color *" error={errors.color}>
            <input
              type="text"
              placeholder="e.g. Golden, White, Black & White…"
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
              className="farm-input"
            />
          </FormField>

          {/* Age & Weight side by side */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Age (weeks)" error={errors.ageWeeks}>
              <input
                type="number"
                min={0}
                value={form.ageWeeks}
                onChange={(e) => set("ageWeeks", Number(e.target.value))}
                className="farm-input"
              />
            </FormField>
            <FormField label="Weight (kg)" error={errors.weightKg}>
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={form.weightKg}
                onChange={(e) => set("weightKg", Number(e.target.value))}
                className="farm-input"
              />
            </FormField>
          </div>

          {/* Status */}
          <FormField label="Status">
            <div className="grid grid-cols-2 gap-3">
              {(
                ["healthy", "sick", "laying", "brooding"] as ChickenStatus[]
              ).map((s) => {
                const emoji = {
                  healthy: "💚",
                  sick: "🤒",
                  laying: "🥚",
                  brooding: "🪺",
                }[s];
                const active = form.status === s;
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => set("status", s)}
                    className={`py-2.5 rounded-xl border-2 font-semibold text-sm capitalize transition-all ${
                      active
                        ? "bg-amber-600 text-white border-amber-600 shadow"
                        : "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400"
                    }`}
                  >
                    {emoji} {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                );
              })}
            </div>
          </FormField>

          {/* Notes */}
          <FormField label="Notes">
            <textarea
              placeholder="Any special notes about this chicken…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              className="farm-input resize-none"
            />
          </FormField>

          {/* Newborn checkbox */}
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div
              onClick={() => set("isNewborn", !form.isNewborn)}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                form.isNewborn
                  ? "bg-pink-500 border-pink-500"
                  : "bg-white border-amber-300 group-hover:border-amber-500"
              }`}
            >
              {form.isNewborn && (
                <span className="text-white text-sm font-bold">✓</span>
              )}
            </div>
            <span className="text-amber-800 font-medium">
              🐣 Mark as Newborn (just hatched!)
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="bg-amber-50 border-t border-amber-100 px-6 py-4 flex gap-3 justify-end">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border-2 border-amber-300 text-amber-700 font-semibold hover:bg-amber-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors shadow-md"
          >
            {isPending ? "Saving…" : "➕ Add to Flock"}
          </button>
        </div>
      </form>
    </main>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-amber-800 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
