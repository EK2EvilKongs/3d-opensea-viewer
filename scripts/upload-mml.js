/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const MML_DIR = path.join(process.cwd(), 'public/assets/mml-files');
const BLOB_FOLDER = 'assets/mml-files';

async function uploadMML() {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error('❌ BLOB_READ_WRITE_TOKEN not found in .env.local');
    }

    if (!fs.existsSync(MML_DIR)) {
        throw new Error(`❌ MML folder not found: ${MML_DIR}`);
    }

    const files = fs.readdirSync(MML_DIR).filter(file => {
        const fullPath = path.join(MML_DIR, file);
        return fs.statSync(fullPath).isFile() && file.endsWith('.mml');
    });

    console.log(`📦 Found ${files.length} MML files`);

    for (const file of files) {
        const filePath = path.join(MML_DIR, file);
        const buffer = fs.readFileSync(filePath);

        try {
            const blobPath = `${BLOB_FOLDER}/${file}`;

            const result = await put(blobPath, buffer, {
                access: 'public',
                contentType: 'application/xml', // ✅ FIX
                allowOverwrite: true,
            });

            console.log(`✅ Uploaded ${file}`);
            await new Promise(r => setTimeout(r, 30));
        } catch (err) {
            console.error(`❌ Error uploading ${file}`, err.message);
        }
    }

    console.log('🔥 MML upload finished');
}

uploadMML().catch(console.error);