import { useEffect, useState, useCallback } from "react";
import {
  Plant,
  Stores,
  addData,
  getData,
  deleteData,
  updateData,
} from "@/lib/db";
import "./App.css";

interface Timers {
  [id: string]: number;
}

function App() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [timers, setTimers] = useState<Timers>({} as Timers);

  const updateTimers = useCallback(() => {
    const timers = plants!.reduce((acc, cur) => {
      const diff = new Date().getTime() - cur.last_watered_at.getTime();
      const seconds = Math.floor(diff / 1000);
      return { ...acc, [cur.id]: seconds };
    }, {});
    setTimers(timers);
  }, [plants]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateTimers]);

  const handleGetPlants = async () => {
    const plants = await getData<Plant>(Stores.Plants);
    setPlants(plants);
    updateTimers();
  };

  const logError = (err: unknown) => {
    if (err instanceof Error) console.error(err.message);
    else console.error("Something went wrong.");
  };

  const handleAddPlant = async () => {
    const plant: Plant = {
      id: Date.now().toString(),
      name: "Plant",
      registered_at: new Date(),
      last_watered_at: new Date(),
      period: 7,
    };

    addData(Stores.Plants, plant).then(handleGetPlants).catch(logError);
  };

  const handleRemovePlant = async (id: string) => {
    deleteData(Stores.Plants, id).then(handleGetPlants).catch(logError);
  };

  const handleUpdatePlant = async (plant: Plant) => {
    updateData(Stores.Plants, plant).then(handleGetPlants).catch(logError);
  };

  const handleWater = async (plant: Plant) => {
    plant.last_watered_at = new Date();
    handleUpdatePlant(plant);
  };

  return (
    <div>
      <main className="container">
        {plants.map((plant: Plant) => (
          <div key={plant.id}>
            <h2>{plant.name}</h2>
            <p>{plant.registered_at.toString()}</p>
            <p>{plant.last_watered_at.toString()}</p>
            <p>{timers[plant.id]}</p>
            <button onClick={() => handleWater(plant)}>Water</button>
            <br />
            <button onClick={() => handleRemovePlant(plant.id)}>x</button>
          </div>
        ))}
        <button onClick={handleAddPlant}>+</button>
        <button onClick={handleGetPlants}>Refresh</button>
      </main>
    </div>
  );
}

export default App;
