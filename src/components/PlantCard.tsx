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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  // SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Delete, Droplet, /* Edit, */ Settings } from "lucide-react";

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
      const days = time / (24 * 60 * 60);
      setTimer({ time, normalized, days });
    }, 1000);

    return () => clearInterval(interval);
  }, [plant]);

  return (
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
        <Photo
          photo={plant.photo}
          handleUpdate={(photo: string) => {
            plant.photo = photo;
            handleUpdate(plant);
          }}
        />
        <div className="my-4 flex-col flex gap-2">
          <p>
            Last watered{" "}
            <DatePicker
              date={plant.last_watered_at}
              disabled={{ after: new Date() }}
              onSelect={(date: Date) => {
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
          <div className="grid w-full gap-1.5 pt-2">
            <Label htmlFor={plant.id + "c"}>Comments</Label>
            <Textarea
              id={plant.id + "c"}
              placeholder="Type additional info here."
              value={plant.comments}
              onChange={(e) => {
                plant.comments = e.target.value;
                handleUpdate(plant);
              }}
            />
          </div>
        </div>
        <Progress value={timer.normalized} />
      </CardContent>
      <CardFooter className="justify-between">
        <div className="items-center flex gap-2">
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
          <Badge
            variant={
              timer.days < 0.5
                ? "destructive"
                : timer.days <= 1
                  ? "default"
                  : "secondary"
            }
          >
            Water{" "}
            {timer.days < 0.5
              ? "today"
              : timer.days <= 1
                ? "tomorrow"
                : `in ${Math.ceil(timer.days)} days`}
          </Badge>
        </div>
        <Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <SheetTrigger disabled>
                <DropdownMenuItem disabled>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </SheetTrigger> */}
              <DropdownMenuItem onClick={() => handleDelete(plant.id)}>
                <Delete className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit</SheetTitle>
            </SheetHeader>
            <div></div>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}

export default PlantCard;
