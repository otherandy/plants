import { useEffect, useState } from "react";
import Plant from "@/types/plant";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Droplet } from "lucide-react";

function PlantCard({
  plant,
  handleUpdate,
  handleDelete,
}: {
  plant: Plant;
  handleUpdate: (plant: Plant) => void;
  handleDelete: (id: string) => void;
}) {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const period = plant.period * 24 * 60 * 60;
      const next = new Date(plant.last_watered_at.getTime() + period * 1000);
      const remaining = next.getTime() - new Date().getTime();
      const timer = Math.floor(remaining / 1000);
      const normalized = (timer / period) * 100;
      setTimer(normalized);
    }, 1000);

    return () => clearInterval(interval);
  }, [plant]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="aspect-square">
          <CardHeader>
            <CardTitle>
              <input
                value={plant.name}
                placeholder="Name"
                onChange={(e) => {
                  plant.name = e.target.value;
                  handleUpdate(plant);
                }}
              />
            </CardTitle>
            <CardDescription>
              <input
                value={plant.description}
                placeholder="Description"
                className="placeholder:italic"
                onChange={(e) => {
                  plant.description = e.target.value;
                  handleUpdate(plant);
                }}
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-square mb-2" />
            <p className="leading-7">
              Last watered at {plant.last_watered_at.toLocaleString()}
            </p>
            <p className="leading-7 mb-2">Period: {plant.period} days</p>
            <Progress value={timer} />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                plant.last_watered_at = new Date();
                handleUpdate(plant);
              }}
              variant="default"
              size="icon"
            >
              <Droplet />
            </Button>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem disabled>Edit</ContextMenuItem>
        <ContextMenuItem onClick={() => handleDelete(plant.id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default PlantCard;
