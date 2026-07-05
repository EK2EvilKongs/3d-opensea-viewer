import { useState, useCallback, useMemo } from 'react';

// --- Constantes de Colores para Temas ---
// Exportamos esta constante para que los componentes puedan usar los nombres de las clases de Tailwind
export const THEME_COLORS = {
    'PORTAL_GREEN': 'lime-400',
    'ELECTRIC_PURPLE': 'fuchsia-600',
    'NEON_YELLOW': 'yellow-300',
    'FIERY_RED': 'red-600',
    'DEEP_SPACE': 'gray-900',
};

// --- Hook de Estado de Conexión de Billetera ---
export const useWeb3Status = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = useCallback(() => {
    // En una aplicación real, se usaría la lógica de conexión Web3 (e.g., Wagmi, Ethers)
    console.log("Intentando conectar billetera...");
    setTimeout(() => {
      setIsConnected(true);
      // Generación de una dirección simulada
      setAddress('0x' + (Math.random() * 0xFFFFFFFFFFFFFF).toString(16).slice(0, 40));
    }, 1000);
  }, []);

  const displayAddress = useMemo(() => {
    if (!address) return '';
    // Muestra una dirección truncada para la UI
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }, [address]);

  return { isConnected, address, connectWallet, displayAddress };
};

// --- Hook de Contrato NFT Simulado (Colección Agotada) ---
export const useNFTContract = () => {
    const [isMinting] = useState(false);
    const [transactionHash] = useState<string | null>(null);

    // Valores fijos para simular el estado de AGOTADO
    const totalSupply = 10000;
    const mintedSupply = totalSupply; 
    const isSoldOut = mintedSupply >= totalSupply;

    // Función placeholder para la acuñación (no hace nada real)
    const mintNFT = useCallback(async (count: number) => {
        console.log(`Intento de acuñar ${count} NFTs, pero la colección está Agotada.`);
    }, []);

    return {
        isMinting,
        mintNFT,
        totalSupply,
        mintedSupply,
        isSoldOut,
        // Proporcionamos valores dummy para el control de cantidad ya que no es funcional
        mintCount: 1,
        setMintCount: (c: number) => {}, 
        transactionHash 
    };
};