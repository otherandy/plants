import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CameraIcon } from "lucide-react";

const constraints = {
  width: 960,
  height: 720,
  facingMode: "environment",
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
      <AspectRatio ratio={4 / 3} className="bg-muted rounded-md">
        <Webcam
          ref={webcamRef}
          disablePictureInPicture
          width={constraints.width}
          height={constraints.height}
          className="rounded-md"
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
          videoConstraints={constraints}
          style={{ objectFit: "cover" }}
        />
      </AspectRatio>
      <Button onClick={capture}>
        <CameraIcon />
      </Button>
    </div>
  );
}
