const fs = require("fs");
const path = require("path");

// Metadata folder
const metadataDir = path.resolve("public/assets/metadata");

// Base image URL
const IMAGE_BASE =
  "https://ahg3rwwgyllpeg9a.public.blob.vercel-storage.com/nfts";

const files = fs.readdirSync(metadataDir);

let updated = 0;

for (const file of files) {
  const filePath = path.join(metadataDir, file);

  if (!fs.statSync(filePath).isFile()) continue;

  try {
    const metadata = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Overwrite the image field
    metadata.image = `${IMAGE_BASE}/${file}.png`;

    fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2), "utf8");

    console.log(`✔ Updated ${file}`);
    updated++;
  } catch (err) {
    console.error(`✖ Error in ${file}: ${err.message}`);
  }
}

console.log(`\nDone! Updated ${updated} metadata files.`);