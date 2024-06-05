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
    updateData(Stores.Plants, plant)
      .then(() => {
        const updatedPlants = plants.map((p) =>
          p.id === plant.id ? plant : p,
        );
        setPlants(updatedPlants);
      })
      .catch(logError);
  };

  return (
    <>
      <nav className="justify-end flex p-4">
        <Button onClick={handleGetAll} variant="ghost">
          Refresh
        </Button>
      </nav>
      <main className="container pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.map((plant: Plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
          <Button
            onClick={handleCreate}
            variant="outline"
            size="icon"
            className="aspect-square h-fit w-full"
          >
            <Plus />
          </Button>
        </div>
      </main>
    </>
  );
}

export default App;
