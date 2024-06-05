import { useEffect, useState } from "react";
import Plant from "@/types/plant";
import Photo from "@/components/Photo";
import DatePicker from "@/components/DatePicker";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Droplet } from "lucide-react";

interface Timer {
  time: number;
  normalized: number;
  days: number;
}

function PlantCard({
  plant,
  handleUpdate,
  handleDelete,
}: {
  plant: Plant;
  handleUpdate: (plant: Plant) => void;
  handleDelete: (id: string) => void;
}) {
  const [timer, setTimer] = useState<Timer>({
    time: 0,
    normalized: 0,
    days: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const period = plant.period * 24 * 60 * 60;
      const next = new Date(plant.last_watered_at.getTime() + period * 1000);
      const remaining = next.getTime() - new Date().getTime();
      const time = Math.floor(remaining / 1000);
      const normalized = (time / period) * 100;
      const days = Math.ceil(time / (24 * 60 * 60));
      setTimer({ time, normalized, days });
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
                className="w-full"
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
                className="placeholder:italic w-full"
                onChange={(e) => {
                  plant.description = e.target.value;
                  handleUpdate(plant);
                }}
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Photo plant={plant} handleUpdate={handleUpdate} />
            <div className="my-4 leading-10">
              <p>
                Last watered{" "}
                <DatePicker
                  date={plant.last_watered_at}
                  handleUpdate={(date: Date) => {
                    plant.last_watered_at = date;
                    handleUpdate(plant);
                  }}
                />
              </p>
              <p>
                Water every{" "}
                <Select
                  onValueChange={(value) => {
                    plant.period = parseInt(value);
                    handleUpdate(plant);
                  }}
                >
                  <SelectTrigger className="w-[4rem] inline-flex">
                    <SelectValue placeholder={plant.period} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 3, 5, 7, 10, 14, 15, 30].map((days) => (
                      <SelectItem
                        key={plant.id + "sp" + days}
                        value={days.toString()}
                      >
                        {days}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>{" "}
                days
              </p>
              <p>
                Water {timer.days == 1 ? "tomorrow" : `in ${timer.days} days`}
              </p>
            </div>
            <Progress value={timer.normalized} />
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
