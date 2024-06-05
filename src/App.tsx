import { useEffect, useState } from "react";
import { Stores, addData, getData, deleteData, updateData } from "@/lib/db";
import Plant from "@/types/plant";
import PlantCard from "@/components/PlantCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import "./App.css";

function App() {
  const [plants, setPlants] = useState<Plant[]>([]);

  const handleGetPlants = async () => {
    const plants = await getData<Plant>(Stores.Plants);
    setPlants(plants);
  };

  useEffect(() => {
    handleGetPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleDelete = async (id: string) => {
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
    <>
      <nav className="justify-end flex p-4">
        <Button onClick={handleGetPlants} variant="ghost">
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
            onClick={handleAddPlant}
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
