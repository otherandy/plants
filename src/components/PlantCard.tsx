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
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Delete, Droplet, /* Edit, */ Settings } from "lucide-react";

class Timer {
  constructor(remaining = 0, normalized = 0) {
    this.remaining = remaining;
    this.normalized = normalized;
  }

  remaining: number;
  normalized: number;

  toDate() {
    return new Date(Date.now() + this.remaining);
  }
}

function toDayName(day: number) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

function whenToWater(timer: Timer) {
  if (timer.remaining < 0) {
    return "today";
  }
  const remainingHours = timer.remaining / 1000 / 60 / 60;
  if (remainingHours < 24) {
    return "tomorrow";
  }
  const remainingDays = remainingHours / 24;
  if (remainingDays < 7) {
    return "this " + toDayName(timer.toDate().getDay());
  }
  return "in " + Math.ceil(remainingHours / 24) + " days";
}

function whenVariant(timer: Timer) {
  const when = whenToWater(timer);

  if (when == "today") {
    return "destructive";
  } else if (when == "tomorrow") {
    return "default";
  } else if (when.startsWith("this")) {
    return "secondary";
  }
  return "outline";
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
  const [timer, setTimer] = useState<Timer>(new Timer());

  useEffect(() => {
    const interval = setInterval(() => {
      const period = plant.period * 24 * 60 * 60 * 1000; // days to milliseconds
      const next = new Date(plant.last_watered_at.getTime() + period);
      const remaining = next.getTime() - new Date().getTime();
      const normalized = (remaining / period) * 100;
      setTimer(new Timer(remaining, normalized));
    }, 1000);

    return () => clearInterval(interval);
  }, [plant]);

  return (
    <Card>
      <Header plant={plant} handleUpdate={handleUpdate} />
      <Content plant={plant} timer={timer} handleUpdate={handleUpdate} />
      <Footer
        plant={plant}
        timer={timer}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Card>
  );
}

function Header({
  plant,
  handleUpdate,
}: {
  plant: Plant;
  handleUpdate: (plant: Plant) => void;
}) {
  return (
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
  );
}

function Content({
  plant,
  timer,
  handleUpdate,
}: {
  plant: Plant;
  timer: Timer;
  handleUpdate: (plant: Plant) => void;
}) {
  return (
    <CardContent>
      <Photo
        photo={plant.photo}
        handleUpdate={(photo: string) => {
          plant.photo = photo;
          handleUpdate(plant);
        }}
      />
      <div className="my-4 flex-col flex gap-3">
        <div className="grid gap-1.5">
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
        <div className="flex gap-3 justify-between flex-col md:flex-row">
          <div className="grid gap-1.5">
            <Label htmlFor={plant.id + "dp"}>Last watered</Label>
            <DatePicker
              id={plant.id + "dp"}
              date={plant.last_watered_at}
              disabled={{ after: new Date() }}
              onSelect={(date: Date) => {
                plant.last_watered_at = date;
                handleUpdate(plant);
              }}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={plant.id + "we"}>Water every</Label>
            <div id={plant.id + "we"}>
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
                  {[1, 2, 3, 5, 7, 10, 14, 15, 30].map((days) => (
                    <SelectItem
                      key={plant.id + "sp" + days}
                      value={days.toString()}
                    >
                      {days}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span> days</span>
            </div>
          </div>
        </div>
      </div>
      <Progress value={timer.normalized} />
    </CardContent>
  );
}

function Footer({
  plant,
  timer,
  handleUpdate,
  handleDelete,
}: {
  plant: Plant;
  timer: Timer;
  handleUpdate: (plant: Plant) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <CardFooter className="justify-between">
      <div className="items-center flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <Button
              variant="default"
              size="icon"
              asChild
              onClick={() => {
                plant.last_watered_at = new Date();
                handleUpdate(plant);
              }}
            >
              <TooltipTrigger>
                <Droplet />
              </TooltipTrigger>
            </Button>
            <TooltipContent>Water now</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge variant={whenVariant(timer)}>Water {whenToWater(timer)}</Badge>
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
  );
}

export default PlantCard;
