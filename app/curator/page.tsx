import fs from "fs";
import path from "path";
import CuratorClient from "./CuratorClient";

export const metadata = {
  title: "Image Curation Studio",
};

export default async function CuratorPage() {
  // Read all generated images from the new-gen-product-images folder
  const snapshotDirPath = path.join(
    process.cwd(),
    "public",
    "new-gen-product-images",
  );
  let newImages: string[] = [];

  try {
    if (fs.existsSync(snapshotDirPath)) {
      const files = fs.readdirSync(snapshotDirPath);
      // Filter out non-image files if any
      newImages = files
        .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
        .map((f) => f); // WE only pass the filename
    }
  } catch (err) {
    console.error("Error reading snapshot images:", err);
  }

  return <CuratorClient newImages={newImages} />;
}
