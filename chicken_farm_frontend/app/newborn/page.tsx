"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addChicken } from "@/lib/actions/chicken.actions";
import Link from "next/link";

const CHICK_BREEDS = [
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
  "Mixed / Unknown",
];

const CHICK_COLORS = [
  "Yellow",
  "Pale Yellow",
  "White",
  "Brown",
  "Black",
  "Grey",
  "Mixed",
];

export default function NewbornPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    color: "Yellow",
    notes: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() && form.quantity === 1)
      e.name = "Name is required for a single chick";
    if (!form.breed.trim()) e.breed = "Breed is required";
    if (form.quantity < 1) e.quantity = "Must add at least 1 chick";
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
      if (form.quantity === 1) {
        await addChicken({
          name: form.name,
          breed: form.breed,
          type: "chick",
          color: form.color,
          ageWeeks: 0,
          weightKg: 0.05,
          status: "healthy",
          notes: form.notes || "Newly hatched!",
          isNewborn: true,
        });
      } else {
        for (let i = 1; i <= form.quantity; i++) {
          await addChicken({
            name: form.name ? `${form.name} #${i}` : `Chick #${i}`,
            breed: form.breed,
            type: "chick",
            color: form.color,
            ageWeeks: 0,
            weightKg: 0.05,
            status: "healthy",
            notes: form.notes || "Newly hatched!",
            isNewborn: true,
          });
        }
      }
      setAddedCount(form.quantity);
      setSubmitted(true);
      setTimeout(() => router.push("/"), 2500);
    });
  };

  const set = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: Math.min(addedCount, 5) }).map((_, i) => (
            <span
              key={i}
              className="text-5xl animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              🐣
            </span>
          ))}
        </div>
        <h2 className="text-3xl font-extrabold text-pink-700 mb-2">
          {addedCount} Chick{addedCount > 1 ? "s" : ""} Added!
        </h2>
        <p className="text-pink-500">
          Your new{addedCount > 1 ? " baby chicks have" : " baby chick has"}{" "}
          been welcomed to the flock! Redirecting…
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-6xl animate-bounce-slow inline-block">🐣</span>
        <h2 className="text-3xl font-extrabold text-pink-700 mt-3">
          New Born Chicks!
        </h2>
        <p className="text-pink-500 mt-1">
          Congratulations! Register your newly hatched baby chicks here.
        </p>
      </div>

      {/* Hatching Banner */}
      <div className="bg-linear-to-r from-pink-100 to-yellow-100 border-2 border-pink-200 rounded-2xl px-5 py-4 mb-8 flex items-center gap-4">
        <span className="text-4xl">🪺</span>
        <div>
          <p className="font-bold text-pink-800">Fresh from the Nest!</p>
          <p className="text-sm text-pink-600">
            Newborns are automatically set as chicks, age 0 weeks, and 0.05 kg.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl border-2 border-pink-100 overflow-hidden"
      >
        <div className="bg-linear-to-r from-pink-400 to-rose-400 px-6 py-4">
          <p className="text-white font-bold text-sm uppercase tracking-widest">
            Hatchling Information
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">
              How many chicks hatched?
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => set("quantity", Math.max(1, form.quantity - 1))}
                className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 font-bold text-xl hover:bg-pink-200 transition-colors border-2 border-pink-200"
              >
                −
              </button>
              <span className="text-3xl font-extrabold text-pink-700 min-w-12 text-center">
                {form.quantity}
              </span>
              <button
                type="button"
                onClick={() => set("quantity", form.quantity + 1)}
                className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 font-bold text-xl hover:bg-pink-200 transition-colors border-2 border-pink-200"
              >
                +
              </button>
              <div className="flex gap-1 ml-2">
                {Array.from({ length: Math.min(form.quantity, 8) }).map(
                  (_, i) => (
                    <span key={i} className="text-xl">
                      🐣
                    </span>
                  ),
                )}
                {form.quantity > 8 && (
                  <span className="text-sm text-pink-400 font-bold self-end">
                    +{form.quantity - 8}
                  </span>
                )}
              </div>
            </div>
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-1.5">
              Name{" "}
              {form.quantity > 1 ? "(will be numbered automatically)" : "*"}
            </label>
            <input
              type="text"
              placeholder={
                form.quantity > 1
                  ? "e.g. Fluffy → Fluffy #1, Fluffy #2…"
                  : "e.g. Peep, Nugget, Tiny…"
              }
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="farm-input border-pink-200 focus:border-pink-400 focus:ring-pink-100"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Breed */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-1.5">
              Breed *
            </label>
            <select
              value={form.breed}
              onChange={(e) => set("breed", e.target.value)}
              className="farm-input border-pink-200 focus:border-pink-400 focus:ring-pink-100"
            >
              <option value="">Select breed…</option>
              {CHICK_BREEDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.breed && (
              <p className="text-red-500 text-xs mt-1">{errors.breed}</p>
            )}
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-2">
              Feather Color
            </label>
            <div className="flex flex-wrap gap-2">
              {CHICK_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => set("color", c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
                    form.color === c
                      ? "bg-pink-500 text-white border-pink-500 shadow"
                      : "bg-pink-50 text-pink-700 border-pink-200 hover:border-pink-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-pink-800 mb-1.5">
              Notes
            </label>
            <textarea
              placeholder="Any special observations about the hatch…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              className="farm-input resize-none border-pink-200 focus:border-pink-400 focus:ring-pink-100"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-pink-50 border-t border-pink-100 px-6 py-4 flex gap-3 justify-end">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border-2 border-pink-200 text-pink-600 font-semibold hover:bg-pink-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors shadow-md"
          >
            {isPending
              ? "Saving…"
              : `🐣 Register Chick${form.quantity > 1 ? "s" : ""}`}
          </button>
        </div>
      </form>
    </main>
  );
}
