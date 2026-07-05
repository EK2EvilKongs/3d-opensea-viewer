/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const GLB_DIR = path.join(process.cwd(), 'public/assets/glb-files');
const BLOB_FOLDER = 'assets/glb-files';

async function uploadGLB() {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error('❌ BLOB_READ_WRITE_TOKEN not found in .env.local');
    }

    if (!fs.existsSync(GLB_DIR)) {
        throw new Error(`❌ GLB folder not found: ${GLB_DIR}`);
    }

    const files = fs.readdirSync(GLB_DIR).filter(file => {
        const fullPath = path.join(GLB_DIR, file);
        return fs.statSync(fullPath).isFile() && file.endsWith('.glb');
    });

    console.log(`📦 Found ${files.length} GLB files`);

    for (const file of files) {
        const filePath = path.join(GLB_DIR, file);
        const buffer = fs.readFileSync(filePath);

        try {
            const blobPath = `${BLOB_FOLDER}/${file}`;

            const result = await put(blobPath, buffer, {
                access: 'public',
                contentType: 'model/gltf-binary', // ✅ FIX
                allowOverwrite: true,
            });

            console.log(`✅ Uploaded ${file}`);
            await new Promise(r => setTimeout(r, 30));
        } catch (err) {
            console.error(`❌ Error uploading ${file}`, err.message);
        }
    }

    console.log('🔥 GLB upload finished');
}

uploadGLB().catch(console.error);