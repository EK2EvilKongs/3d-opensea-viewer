const fs = require("fs");
const path = require("path");

const METADATA_DIR = path.join(
    process.cwd(),
    "public",
    "assets",
    "metadata"
);

const MML_DIR = path.join(
    process.cwd(),
    "public",
    "assets",
    "mml-files"
);

function normalizeName(name) {
    return name
        .trim()
        .replace(/\s+/g, "-");
}

if (!fs.existsSync(MML_DIR)) {
    fs.mkdirSync(MML_DIR, { recursive: true });
}

const files = fs.readdirSync(METADATA_DIR);

console.log(`Found ${files.length} metadata files`);

for (const file of files) {

    const filePath = path.join(
        METADATA_DIR,
        file
    );

    if (!fs.statSync(filePath).isFile()) {
        continue;
    }

    try {

        const metadata = JSON.parse(
            fs.readFileSync(filePath, "utf8")
        );

        const attrs =
            metadata.attributes || [];

        const oneOfOne = attrs.find(
            (x) => x.trait_type === "1/1"
        );

        const body = attrs.find(
            (x) => x.trait_type === "Body"
        );

        let assetName;

        if (oneOfOne?.value) {
            assetName = oneOfOne.value;
        } else if (body?.value) {
            assetName = body.value;
        } else {
            console.log(`Skipping ${file}`);
            continue;
        }

        // Ghost Face -> Ghost-Face
        const normalizedName =
            normalizeName(assetName);

        metadata.mml =
            `https://apedata2.goblinsaga.xyz/assets/mml-files/${normalizedName}.mml`;

        fs.writeFileSync(
            filePath,
            JSON.stringify(
                metadata,
                null,
                2
            )
        );

        const mmlFile = path.join(
            MML_DIR,
            `${normalizedName}.mml`
        );

        if (!fs.existsSync(mmlFile)) {

            fs.writeFileSync(
                mmlFile,
                `<m-character src="https://apedata2.goblinsaga.xyz/assets/glb-files/${normalizedName}.glb"></m-character>`
            );

            console.log(
                `Created ${normalizedName}.mml`
            );
        }

        console.log(
            `Updated ${file} -> ${normalizedName}`
        );

    } catch (err) {

        console.error(
            `Error in ${file}:`,
            err.message
        );
    }
}

console.log("DONE");