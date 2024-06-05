import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CameraIcon } from "lucide-react";

const constraints = {
  width: 960,
  height: 720,
};

export default function Camera({
  updateData,
}: {
  updateData: (data: string) => void;
}) {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) updateData(imageSrc);
  }, [updateData]);

  return (
    <div className="mt-auto flex flex-col gap-2 px-4 pt-2">
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <Webcam
          ref={webcamRef}
          disablePictureInPicture
          className="rounded-lg"
          screenshotFormat="image/jpeg"
          videoConstraints={constraints}
        />
      </AspectRatio>
      <Button onClick={capture}>
        <CameraIcon />
      </Button>
    </div>
  );
}
