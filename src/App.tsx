import { useEffect, useState } from "react";
import { Stores, addData, getData, deleteData, updateData } from "@/lib/db";
import Plant, { createPlant } from "@/types/plant";
import PlantCard from "@/components/PlantCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import "./App.css";

function App() {
  const [plants, setPlants] = useState<Plant[]>([]);

  const handleGetAll = async () => {
    const plants = await getData<Plant>(Stores.Plants);
    setPlants(plants);
  };

  useEffect(() => {
    handleGetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logError = (err: unknown) => {
    if (err instanceof Error) console.error(err.message);
    else console.error("Something went wrong.");
  };

  const handleCreate = async () => {
    addData(Stores.Plants, createPlant()).then(handleGetAll).catch(logError);
  };

  const handleDelete = async (id: string) => {
    deleteData(Stores.Plants, id).then(handleGetAll).catch(logError);
  };

  const handleUpdate = async (plant: Plant) => {
    updateData(Stores.Plants, plant).then(handleGetAll).catch(logError);
  };

  const handleWater = async (plant: Plant) => {
    plant.last_watered_at = new Date();
    handleUpdate(plant);
  };

  return (
    <>
      <nav className="justify-end flex p-4">
        <Button onClick={handleGetAll} variant="ghost">
          Refresh
        </Button>
      </nav>
      <main className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plants.map((plant: Plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              handleWater={handleWater}
              handleDelete={handleDelete}
            />
          ))}
          <Button
            onClick={handleCreate}
            variant="outline"
            size="icon"
            className="aspect-square h-full w-full"
          >
            <Plus />
          </Button>
        </div>
      </main>
    </>
  );
}

export default App;
