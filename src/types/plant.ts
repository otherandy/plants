export default interface Plant {
  id: string;
  name: string;
  description?: string;
  last_watered_at: Date;
  period: number;
  photo?: string;
  comments?: string;
}

export function createPlant(): Plant {
  return {
    id: Date.now().toString(),
    name: "New Plant",
    last_watered_at: new Date(),
    period: 7,
  };
}
