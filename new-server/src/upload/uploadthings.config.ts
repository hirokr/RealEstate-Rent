// uploadthing.config.ts
import { createUploadthing, UTFiles, type FileRouter } from "uploadthing/server";
import { nanoid } from "nanoid";
import slugify from "slugify";

const f = createUploadthing();

export const appFileRouter = {
  imageUploader: f(["image"])
    .middleware(async ({ req, files }) => {
      // Override files
      const fileOverrides = files.map((file) => {
        const newName = slugify(file.name);
        const customId = nanoid(10);

        return { ...file, name: newName, customId };
      });

      // Example metadata
      return { foo: "bar" as const, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", {
        metadata, 
        fileName: file.name,
        fileUrl: file.ufsUrl, 
        customId: file.customId,
      });

      // You can return custom response back to client
      return { fileUrl: file.ufsUrl, id: file.customId };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
