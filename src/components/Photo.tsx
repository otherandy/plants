import {
  DrawerDialog,
  DrawerDialogTrigger,
  DrawerDialogContent,
  DrawerDialogHeader,
  DrawerDialogTitle,
  DrawerDialogFooter,
} from "@/components/DrawerDialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { CameraIcon, Trash } from "lucide-react";
// import Camera from "@/components/Camera";
import FileUpload from "@/components/FileUpload";

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
            <img
              src={photo}
              alt="Plant"
              height={640}
              width={480}
              className="object-cover rounded-md"
            />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => handleUpdate("")}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete Photo</span>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ) : (
        <DrawerDialog>
          <DrawerDialogTrigger>
            <Button variant="outline" className="h-full w-full">
              <CameraIcon />
            </Button>
          </DrawerDialogTrigger>
          <DrawerDialogContent>
            <DrawerDialogHeader>
              <DrawerDialogTitle>Upload Photo</DrawerDialogTitle>
            </DrawerDialogHeader>
            <div className="mt-auto flex flex-col gap-2 px-4 pt-2 md:px-0">
              {/* <Camera /> */}
              <FileUpload updateData={handleUpdate} />
            </div>
            <DrawerDialogFooter />
          </DrawerDialogContent>
        </DrawerDialog>
      )}
    </AspectRatio>
  );
}
