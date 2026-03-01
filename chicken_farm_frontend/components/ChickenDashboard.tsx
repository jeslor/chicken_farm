'use client';

import { useMemo, useState } from 'react';
import ChickenCard from '@/components/ChickenCard';
import { Chicken, ChickenType } from '@/types/chicken';
import Link from 'next/link';

type FilterType = 'all' | ChickenType;

interface ChickenDashboardProps {
  initialChickens: Chicken[];
}

export default function ChickenDashboard({ initialChickens }: ChickenDashboardProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    const hens = initialChickens.filter((c) => c.type === 'hen').length;
    const roosters = initialChickens.filter((c) => c.type === 'rooster').length;
    const chicks = initialChickens.filter((c) => c.type === 'chick').length;
    const newborns = initialChickens.filter((c) => c.isNewborn).length;
    const laying = initialChickens.filter((c) => c.status === 'laying').length;
    return {
      hens,
      roosters,
      chicks,
      newborns,
      laying,
      total: initialChickens.length,
    };
  }, [initialChickens]);

  const filtered = useMemo(() => {
    return initialChickens.filter((c) => {
      const matchType = filter === 'all' || c.type === filter;
      const matchSearch =
        search.trim() === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.breed.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [initialChickens, filter, search]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-amber-900 mb-2">Welcome to Your Flock 🌾</h2>
        <p className="text-amber-700 text-lg">
          Manage, track, and care for all your feathered friends.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <StatCard emoji="🐔" label="Total" value={stats.total} color="amber" />
        <StatCard emoji="🍳" label="Hens" value={stats.hens} color="orange" />
        <StatCard emoji="🐓" label="Roosters" value={stats.roosters} color="red" />
        <StatCard emoji="🐥" label="Chicks" value={stats.chicks} color="yellow" />
        <StatCard emoji="🥚" label="Laying" value={stats.laying} color="purple" />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by name or breed…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="farm-input flex-1"
        />
        <div className="flex gap-2 flex-wrap">
          {(['all', 'hen', 'rooster', 'chick'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                filter === f
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'bg-white text-amber-700 border-amber-300 hover:border-amber-500'
              }`}
            >
              {f === 'all'
                ? '🐔 All'
                : f === 'hen'
                  ? '🍳 Hens'
                  : f === 'rooster'
                    ? '🐓 Roosters'
                    : '🐥 Chicks'}
            </button>
          ))}
        </div>
      </div>

      {/* Chicken Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-amber-50 rounded-3xl border-2 border-dashed border-amber-200">
          <div className="text-6xl mb-4">🪹</div>
          <p className="text-xl font-bold text-amber-800">No chickens found</p>
          <p className="text-amber-600 mt-1">
            {initialChickens.length === 0
              ? 'Your farm is empty! Add your first chicken.'
              : 'Try adjusting your search or filter.'}
          </p>
          <Link
            href="/add"
            className="mt-6 inline-block px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors"
          >
            ➕ Add a Chicken
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((chicken) => (
            <ChickenCard key={chicken.id} chicken={chicken} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-center text-amber-500 text-sm mt-8">
          Showing {filtered.length} of {initialChickens.length} chickens
        </p>
      )}
    </main>
  );
}

function StatCard({
  emoji,
  label,
  value,
  color,
}: {
  emoji: string;
  label: string;
  value: number;
  color: string;
}) {
  const colors: Record<string, string> = {
    amber: 'from-amber-400 to-amber-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    yellow: 'from-yellow-400 to-yellow-600',
    lime: 'from-lime-400 to-lime-600',
  };
  return (
    <div
      className={`bg-linear-to-br ${colors[color]} rounded-2xl p-4 text-white shadow-md flex flex-col items-center justify-center text-center`}
    >
      <span className="text-3xl mb-1">{emoji}</span>
      <span className="text-3xl font-extrabold leading-none">{value}</span>
      <span className="text-xs font-semibold mt-1 opacity-90 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
