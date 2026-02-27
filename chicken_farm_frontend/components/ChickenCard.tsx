'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Chicken, ChickenType, ChickenStatus } from '../types/chicken';
import { deleteChicken } from '@/lib/actions/chicken.actions';

interface ChickenCardProps {
  chicken: Chicken;
}

const typeEmoji: Record<ChickenType, string> = {
  hen: '🐔',
  rooster: '🐓',
  chick: '🐥',
};

const typeLabel: Record<ChickenType, string> = {
  hen: 'Hen',
  rooster: 'Rooster',
  chick: 'Chick',
};

const statusColor: Record<ChickenStatus, string> = {
  healthy: 'bg-green-100 text-green-800 border-green-300',
  sick: 'bg-red-100 text-red-800 border-red-300',
  laying: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  brooding: 'bg-purple-100 text-purple-800 border-purple-300',
};

const statusEmoji: Record<ChickenStatus, string> = {
  healthy: '💚',
  sick: '🤒',
  laying: '🥚',
  brooding: '🪺',
};

export default function ChickenCard({ chicken }: ChickenCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const favoriteChicken = chicken.isNewborn;

  function handleDelete() {
    startTransition(async () => {
      await deleteChicken(chicken.id);
      router.refresh();
    });
  }

  const ageDisplay =
    chicken.ageWeeks < 8
      ? `${chicken.ageWeeks}w old`
      : `${Math.floor(chicken.ageWeeks / 52) > 0 ? Math.floor(chicken.ageWeeks / 52) + 'y ' : ''}${chicken.ageWeeks % 52}w`;

  return (
    <div className="chicken-card group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300 overflow-hidden">
      {/* Newborn Badge */}
      {chicken.isNewborn && (
        <div className="absolute top-3 left-3 z-10 bg-pink-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow animate-bounce-slow">
          🐣 Newborn!
        </div>
      )}

      {/* Header */}
      <div className="bg-linear-to-br from-amber-50 to-yellow-100 p-5 pt-6 text-center border-b border-amber-100">
        <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
          {typeEmoji[chicken.type]}
        </div>
        <h3 className="text-xl font-extrabold text-amber-900 tracking-tight">{chicken.name}</h3>
        <p className="text-sm text-amber-600 font-medium mt-0.5">{chicken.breed}</p>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        {/* Type & Status Row */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
            {typeEmoji[chicken.type]} {typeLabel[chicken.type]}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold border px-2.5 py-1 rounded-full ${statusColor[chicken.status]}`}
          >
            {statusEmoji[chicken.status]}{' '}
            {chicken.status.charAt(0).toUpperCase() + chicken.status.slice(1)}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Age" value={ageDisplay} />
          <Stat label="Weight" value={`${chicken.weightKg}kg`} />
          <Stat label="Color" value={chicken.color} />
        </div>

        {/* Notes */}
        {chicken.notes && (
          <p className="text-xs text-stone-500 bg-stone-50 rounded-lg px-3 py-2 italic border border-stone-100 line-clamp-2">
            &ldquo;{chicken.notes}&rdquo;
          </p>
        )}

        {/* Date */}
        <p className="text-xs text-stone-400 text-right">
          Added{' '}
          {new Date(chicken.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>

        {/* Delete Button */}
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full mt-1 py-2 rounded-xl text-sm font-semibold text-red-500 border-2 border-red-100 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
          >
            🗑️ Remove Chicken
          </button>
        ) : (
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? 'Removing…' : 'Yes, Remove'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              disabled={isPending}
              className="flex-1 py-2 rounded-xl text-sm font-bold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors duration-200 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-amber-50 rounded-xl p-2 text-center border border-amber-100">
      <p className="text-xs text-amber-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-sm font-bold text-amber-900 mt-0.5 truncate">{value}</p>
    </div>
  );
}
