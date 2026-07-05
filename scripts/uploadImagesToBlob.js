require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const IMAGES_DIR = path.join(process.cwd(), 'public/assets/images');
const BLOB_FOLDER = 'nfts';

const CACHE_CONTROL_24H =
    'public, max-age=864, s-maxage=864, must-revalidate';

async function uploadImages() {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error('❌ BLOB_READ_WRITE_TOKEN not found in .env.local');
    }

    let files = fs
        .readdirSync(IMAGES_DIR)
        .filter(file => file.endsWith('.png'));

    // 🔥 ORDEN NUMÉRICO REAL (1 → 3500)
    files.sort((a, b) => {
        const aNum = Number(a.replace('.png', ''));
        const bNum = Number(b.replace('.png', ''));
        return aNum - bNum;
    });

    console.log(`🧌 Found ${files.length} images`);

    for (const file of files) {
        const filePath = path.join(IMAGES_DIR, file);
        const buffer = fs.readFileSync(filePath);

        try {
            const blobPath = `${BLOB_FOLDER}/${file}`;

            const result = await put(blobPath, buffer, {
                access: 'public',
                contentType: 'image/png',
                cacheControl: CACHE_CONTROL_24H, // 👈 AQUÍ
            });

            console.log(`✅ Uploaded ${file} → ${result.url}`);

            // 🧘‍♂️ mini delay para evitar rate limits
            await new Promise(r => setTimeout(r, 30));
        } catch (err) {
            console.error(`❌ Error uploading ${file}`, err.message);
        }
    }

    console.log('🔥 Upload finished');
}

uploadImages().catch(console.error);