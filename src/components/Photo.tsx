import Plant from "@/types/plant";
import Camera from "@/components/Camera";
import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/DrawerDialog";
import { CameraIcon } from "lucide-react";

export default function Photo({
  plant,
  handleUpdate,
}: {
  plant: Plant;
  handleUpdate: (plant: Plant) => void;
}) {
  return (
    <>
      {plant.photo ? (
        <img
          src={plant.photo}
          alt="Plant"
          className="object-scale-down rounded-md"
        />
      ) : (
        <DrawerDialog
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
    </>
  );
}
