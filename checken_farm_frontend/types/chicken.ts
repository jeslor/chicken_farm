export type ChickenType = "hen" | "rooster" | "chick";
export type ChickenStatus = "healthy" | "sick" | "laying" | "brooding";

export interface Chicken {
  id: string;
  name: string;
  breed: string;
  type: ChickenType;
  color: string;
  ageWeeks: number;
  weightKg: number;
  status: ChickenStatus;
  notes: string;
  isNewborn: boolean;
  createdAt: string;
}
