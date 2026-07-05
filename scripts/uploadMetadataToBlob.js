require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const METADATA_DIR = path.join(process.cwd(), 'public/assets/metadata');
const BLOB_FOLDER = 'metadata';

const CACHE_CONTROL = 'public, max-age=86400, s-maxage=86400, must-revalidate';

async function uploadMetadata() {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error('❌ BLOB_READ_WRITE_TOKEN not found in .env.local');
    }

    if (!fs.existsSync(METADATA_DIR)) {
        throw new Error(`❌ Metadata folder not found: ${METADATA_DIR}`);
    }

    let files = fs.readdirSync(METADATA_DIR).filter(file => {
        const fullPath = path.join(METADATA_DIR, file);
        return fs.statSync(fullPath).isFile(); // acepta archivos sin extensión
    });

    // 🔢 Orden numérico REAL (1 → 3500)
    files.sort((a, b) => Number(a) - Number(b));

    console.log(`📦 Found ${files.length} metadata files`);

    for (const file of files) {
        const filePath = path.join(METADATA_DIR, file);
        const buffer = fs.readFileSync(filePath);

        try {
            const blobPath = `${BLOB_FOLDER}/${file}`; // SIN .json

            const result = await put(blobPath, buffer, {
                access: 'public',
                contentType: 'application/json',
                cacheControl: CACHE_CONTROL, // ⏱️ 24 HORAS
                allowOverwrite: true,
            });

            console.log(`✅ Uploaded ${file} → ${result.url}`);

            // 🧘‍♂️ mini delay para evitar rate limits
            await new Promise(r => setTimeout(r, 30));
        } catch (err) {
            console.error(`❌ Error uploading ${file}`, err.message);
        }
    }

    console.log('🔥 Metadata upload finished');
}

uploadMetadata().catch(console.error);