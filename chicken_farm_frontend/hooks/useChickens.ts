'use client';

import { useState, useEffect, useCallback } from 'react';
import { Chicken } from '../types/chicken';

const STORAGE_KEY = 'farm_chickens';

const SEED_DATA: Chicken[] = [
  {
    id: '1',
    name: 'Clucky',
    breed: 'Rhode Island Red',
    type: 'hen',
    color: 'Red-brown',
    ageWeeks: 52,
    weightKg: 2.8,
    status: 'laying',
    notes: 'Best egg layer on the farm',
    isNewborn: false,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '2',
    name: 'Roosty',
    breed: 'Plymouth Rock',
    type: 'rooster',
    color: 'Black & White',
    ageWeeks: 60,
    weightKg: 3.5,
    status: 'healthy',
    notes: 'Very protective of the flock',
    isNewborn: false,
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: '3',
    name: 'Buttercup',
    breed: 'Buff Orpington',
    type: 'hen',
    color: 'Golden',
    ageWeeks: 40,
    weightKg: 2.5,
    status: 'brooding',
    notes: 'Currently sitting on 6 eggs',
    isNewborn: false,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: '4',
    name: 'Peep',
    breed: 'Leghorn',
    type: 'chick',
    color: 'Yellow',
    ageWeeks: 1,
    weightKg: 0.05,
    status: 'healthy',
    notes: 'Just hatched!',
    isNewborn: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export function useChickens() {
  const [chickens, setChickens] = useState<Chicken[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        Promise.resolve().then(() => setChickens(parsed));
      } else {
        Promise.resolve().then(() => setChickens(SEED_DATA));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      }
    } catch {
      Promise.resolve().then(() => setChickens(SEED_DATA));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    }
    Promise.resolve().then(() => setLoaded(true));
  }, []);

  const addChicken = useCallback((chicken: Omit<Chicken, 'id' | 'createdAt'>) => {
    const newChicken: Chicken = {
      ...chicken,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setChickens((prev) => {
      const updated = [...prev, newChicken];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return newChicken;
  }, []);

  const deleteChicken = useCallback((id: string) => {
    setChickens((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { chickens, addChicken, deleteChicken, loaded };
}
