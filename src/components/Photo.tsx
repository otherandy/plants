import Camera from "@/components/Camera";
import { DrawerDialog } from "@/components/DrawerDialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { CameraIcon, Trash } from "lucide-react";

export default function Photo({
  photo,
  handleUpdate,
}: {
  photo?: string;
  handleUpdate: (photo: string) => void;
}) {
  return (
    <AspectRatio ratio={4 / 3} className="flex">
      {photo ? (
        <ContextMenu>
          <ContextMenuTrigger>
            <img src={photo} alt="Plant" className="object-cover rounded-md" />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => handleUpdate("")}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete Photo</span>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ) : (
        <DrawerDialog
          title="Take a photo"
          trigger={
            <Button variant="outline" className="aspect-square h-full w-full">
              <CameraIcon />
            </Button>
          }
        >
          <Camera updateData={handleUpdate} />
        </DrawerDialog>
      )}
    </AspectRatio>
  );
}
