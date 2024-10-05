import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const mediaQuery = "(min-width: 640px)";

function DrawerDialog({
  dialogProps,
  drawerProps,
  children,
}: {
  dialogProps?: React.ComponentProps<typeof Dialog>;
  drawerProps?: React.ComponentProps<typeof Drawer>;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery(mediaQuery);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} {...dialogProps}>
        {children}
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} {...drawerProps}>
      {children}
    </Drawer>
  );
}

const DrawerDialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery(mediaQuery);

  if (isDesktop) {
    return <DialogTrigger asChild>{children}</DialogTrigger>;
  }

  return <DrawerTrigger asChild>{children}</DrawerTrigger>;
};
DrawerDialog.Trigger = DrawerDialogTrigger;

const DrawerDialogContent = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery(mediaQuery);

  if (isDesktop) {
    return (
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    );
  }

  return <DrawerContent>{children}</DrawerContent>;
};
DrawerDialog.Content = DrawerDialogContent;

const DrawerDialogHeader = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery(mediaQuery);

  if (isDesktop) {
    return <DialogHeader>{children}</DialogHeader>;
  }

  return <DrawerHeader className="text-left"></DrawerHeader>;
};
DrawerDialog.Header = DrawerDialogHeader;

const DrawerDialogTitle = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery(mediaQuery);

  if (isDesktop) {
    return <DialogTitle>{children}</DialogTitle>;
  }

  return <DrawerTitle>{children}</DrawerTitle>;
};
DrawerDialog.Title = DrawerDialogTitle;

const DrawerDialogDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDesktop = useMediaQuery(mediaQuery);

  if (isDesktop) {
    return <DialogDescription>{children}</DialogDescription>;
  }

  return <DrawerDescription>{children}</DrawerDescription>;
};
DrawerDialog.Description = DrawerDialogDescription;

const DrawerDialogFooter = () => {
  const isDesktop = useMediaQuery(mediaQuery);

  if (isDesktop) {
    return <></>;
  }

  return (
    <DrawerFooter className="pt-2">
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  );
};
DrawerDialog.Footer = DrawerDialogFooter;

export {
  DrawerDialog,
  DrawerDialogTrigger,
  DrawerDialogContent,
  DrawerDialogHeader,
  DrawerDialogTitle,
  DrawerDialogDescription,
  DrawerDialogFooter,
};
