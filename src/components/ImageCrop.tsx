import { useRef, useState } from "react";
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";

function centerAspectCrop(width: number, height: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: width,
      },
      aspect,
      width,
      height,
    ),
    width,
    height,
  );
}

export default function ImageCrop({
  src,
  updateData,
}: {
  src: string;
  updateData: (data: string) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const width = e.currentTarget.width;
    const height = e.currentTarget.height;

    setCrop(centerAspectCrop(width, height, 4 / 3));
  }

  function finishCrop() {
    if (!imgRef.current || !crop) {
      return;
    }

    let c = crop;

    if (c.width === 0 || c.height === 0) {
      const width = imgRef.current.width;
      const height = imgRef.current.height;
      c = centerAspectCrop(width, height, 4 / 3);
    }

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = c.width;
    canvas.height = c.height;

    ctx.drawImage(
      imgRef.current,
      (c.x || 0) * scaleX,
      (c.y || 0) * scaleY,
      c.width * scaleX,
      c.height * scaleY,
      0,
      0,
      c.width,
      c.height,
    );

    updateData(canvas.toDataURL("image/jpeg"));
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        aspect={4 / 3}
        className="max-w-fit shadow-xl"
      >
        <img ref={imgRef} src={src} onLoad={onImageLoad} />
      </ReactCrop>
      <Button onClick={finishCrop} className="w-full">
        Save
      </Button>
    </div>
  );
}
