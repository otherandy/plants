import Plant from "@/types/plant";
import Camera from "@/components/Camera";
import { DrawerDialog } from "@/components/DrawerDialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CameraIcon } from "lucide-react";

export default function Photo({
  plant,
  handleUpdate,
}: {
  plant: Plant;
  handleUpdate: (plant: Plant) => void;
}) {
  return (
    <AspectRatio ratio={4 / 3} className="flex">
      {plant.photo ? (
        <img
          src={plant.photo}
          alt="Plant"
          className="object-cover rounded-md"
        />
      ) : (
        <DrawerDialog
          title="Take a photo"
          trigger={
            <Button variant="outline" className="aspect-square h-full w-full">
              <CameraIcon />
            </Button>
          }
        >
          <Camera
            updateData={(photo?: string) => {
              plant.photo = photo;
              handleUpdate(plant);
            }}
          />
        </DrawerDialog>
      )}
    </AspectRatio>
  );
}
