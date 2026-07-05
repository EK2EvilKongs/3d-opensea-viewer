export const IPFS_GATEWAYS = [
    "https://nftstorage.link/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.io/ipfs/",
];

export const resolveIPFS = (url?: string) => {
    if (!url) return [];
    if (!url.startsWith("ipfs://")) return [url];
    const hash = url.replace("ipfs://", "");
    return IPFS_GATEWAYS.map(g => `${g}${hash}`);
};
