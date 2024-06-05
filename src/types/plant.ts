export default interface Plant {
  id: string;
  name: string;
  description?: string;
  last_watered_at: Date;
  period: number;
}

export function createPlant(): Plant {
  return {
    id: Date.now().toString(),
    name: "New Plant",
    description: "",
    last_watered_at: new Date(),
    period: 7,
  };
}
