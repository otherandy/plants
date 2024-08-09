import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";

export default function FileUpload({
  updateData,
}: {
  updateData: (data: string) => void;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      Resizer.imageFileResizer(
        file,
        640,
        480,
        "JPEG",
        80,
        0,
        (uri) => {
          console.log(uri);
          updateData(uri as string);
        },
        "base64",
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <AspectRatio
      ratio={4 / 3}
      className="flex items-center text-center border-accent-foreground border border-dashed rounded-md cursor-pointer p-10 hover:bg-accent transition-colors"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </AspectRatio>
  );
}
