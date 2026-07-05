'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

/* =========================
   CONSTANTS
========================= */
const IMAGE_BASE = 'https://ahg3rwwgyllpeg9a.public.blob.vercel-storage.com/nfts/';
const METADATA_BASE = 'https://ahg3rwwgyllpeg9a.public.blob.vercel-storage.com/metadata/';
const AVATAR_BASE = 'https://apedata2.goblinsaga.xyz/assets/glb-files/';
const OTHERSIDE_LOGO = 'https://goblinsaga.xyz/OneOnes/OtherSide.png';
const DEFAULT_AVATAR = 'Common.glb';

const TRAIT_OVERRIDES: Record<string, string> = {
    "Blue v2": "Common.glb",
    "Blue": "Common.glb",
    "Bone": "Common.glb",
    "Brown": "Common.glb",
    "Common": "Common.glb",
    "Concrete": "Common.glb",
    "Cyan": "Common.glb",
    "Golden": "Common.glb",

    "Green Marble": "Common.glb",
    "Green": "Common.glb",
    "Green-Camo": "Common.glb",
    "Grey Camo": "Common.glb",
    "Grey": "Common.glb",
    "Leopard": "Common.glb",
    "Magenta": "Common.glb",
    "Marble": "Common.glb",

    "Olive": "Common.glb",
    "Radio": "Common.glb",
    "Rainbow v2": "Common.glb",
    "Rainbow": "Common.glb",
    "Red Camo": "Common.glb",
    "Red v2": "Common.glb",
    "Red": "Common.glb",
    "Reptile": "Common.glb",

    "Silver": "Common.glb",
    "Teal": "Common.glb",
    "Tricolor v2": "Common.glb",
    "Tricolor": "Common.glb",
    "Wine v2": "Common.glb",
    "Wine": "Common.glb",
    "Wood": "Common.glb",
    "Yellow": "Common.glb",

    // 🔥 1/1 OVERRIDES
    "Barlog": "Barlog.glb",
    "Cosmic": "Cosmic.glb",
    "Demon Lord": "DemonLord.glb",
    "Mutant": "Mutant.glb",
    "Symbiont": "Symbiont-2.glb",
};

function findOverride(value?: string): string | null {
    if (!value) return null;

    const normalized = value.toLowerCase();

    const match = Object.keys(TRAIT_OVERRIDES).find(
        key => key.toLowerCase() === normalized
    );

    return match ? TRAIT_OVERRIDES[match] : null;
}

/* =========================
   DYNAMIC 3D
========================= */
const Goblin3D = dynamic(
    () => import('../../../components/Goblins3D/Goblin3DB1'),
    {
        ssr: false,
        loading: () => (
            <div className="text-white opacity-70">
                Loading 3D…
            </div>
        ),
    }
);

/* =========================
   IMAGE COMPONENT
========================= */
function NFTImage({ src }: { src: string }) {
    return (
        <img
            src={src}
            alt="Goblin Saga"
            className="max-w-full max-h-full object-contain rounded-xl"
            draggable={false}
            onError={(e: any) => {
                // fallback por si falla el PFP
                e.currentTarget.src = src.replace('/pfps/', '/nfts/');
            }}
        />
    );
}

/* =========================
   VIEWER
========================= */
export default function Viewer() {
    const params = useParams();
    const rawTokenId = params?.tokenId;
    const tokenId = Number(
        Array.isArray(rawTokenId) ? rawTokenId[0] : rawTokenId
    );

    const [mode, setMode] = useState<'pfp' | '3d' | 'avatar'>('pfp');
    const [avatar, setAvatar] = useState(DEFAULT_AVATAR);

    useEffect(() => {
        if (!Number.isInteger(tokenId)) return;

        async function loadMetadata() {
            try {
                const res = await fetch(`${METADATA_BASE}${tokenId}`, {
                    cache: 'no-store',
                });

                const text = await res.text();

                if (!text.trim().startsWith('{')) {
                    setAvatar(DEFAULT_AVATAR);
                    return;
                }

                const data = JSON.parse(text);
                const attributes = data.attributes || [];

                const oneOfOne = attributes.find(
                    (a: any) => a.trait_type?.toLowerCase() === '1/1'
                );

                const body = attributes.find(
                    (a: any) => a.trait_type?.toLowerCase() === 'body'
                );

                let file = DEFAULT_AVATAR;

                if (oneOfOne?.value) {
                    const override = findOverride(oneOfOne.value);

                    if (override) {
                        file = override;
                    }
                } else if (body?.value) {
                    const override = findOverride(body.value);

                    if (override) {
                        file = override;
                    }
                }

                setAvatar(file);
            } catch (error) {
                console.error(error);
                setAvatar(DEFAULT_AVATAR);
            }
        }

        loadMetadata();
    }, [tokenId]);

    if (!Number.isInteger(tokenId)) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-white">
                Invalid token
            </div>
        );
    }

    const pfp = `${IMAGE_BASE}${tokenId}.png`;

    return (
        <div className="w-full h-screen bg-[#282828] flex flex-col text-white border-[3px] border-purple-700">
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">

                {/* SWITCH - SOLO PFP Y 3D */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
                    <div className="flex gap-1 p-1 rounded-[10px] bg-purple-700 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer">

                        <button
                            onClick={() => setMode('pfp')}
                            className={`px-5 py-2 rounded-full text-sm ${mode === 'pfp'
                                ? 'bg-white/30'
                                : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            PFP
                        </button>

                        <button
                            onClick={() => setMode('3d')}
                            className={`px-5 py-2 rounded-full text-sm ${mode === '3d'
                                ? 'bg-white/30'
                                : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            3D
                        </button>

                        <button
                            onClick={() => setMode('avatar')}
                            className={`px-5 py-2 rounded-full text-sm ${mode === 'avatar'
                                ? 'bg-white/30'
                                : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            Avatar
                        </button>

                    </div>
                </div>

                {/* VIEW */}
                {mode === 'pfp' ? (
                    <NFTImage src={pfp} />
                ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Goblin3D src={`${AVATAR_BASE}${avatar}`} />

                        {/* 🟣 OTHERSIDE LOGO */}
                        <img
                            src={OTHERSIDE_LOGO}
                            alt="Otherside"
                            className="absolute bottom-4 right-4 w-20 md:w-24 opacity-90 pointer-events-none select-none"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}