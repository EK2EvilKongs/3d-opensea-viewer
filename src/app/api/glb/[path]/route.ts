export async function GET(
    request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;

    const file = path.join("/");

    const blob = await fetch(
        `https://sncx52uuz3wsp64n.public.blob.vercel-storage.com/assets/glb-files/${file}`,
        {
            headers: {
                "Accept-Encoding": "identity"
            }
        }
    );

    if (!blob.ok) {
        return new Response("File not found", {
            status: 404
        });
    }

    const buffer = await blob.arrayBuffer();

    return new Response(buffer, {
        headers: {
            "Content-Type": "model/gltf-binary",
            "Content-Disposition": "inline",
            "Content-Encoding": "identity",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=2592000"
        }
    });
}