import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'viem';
import { lineaSepolia, linea, lineaTestnet } from 'wagmi/chains';

import { VITE_CONTRACT_ADDRESS, VITE_ENV_NAME, VITE_RPC_URL } from './env';

export const anvilChain: Chain = {
    id: 31337, // Anvil 默认 chainId
    name: 'Anvil',
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: [VITE_RPC_URL] },
        public: { http: [VITE_RPC_URL] },
    },
};

export const config = getDefaultConfig({
    appName: 'Hello Web3',
    projectId: '11111',
    chains:
        VITE_ENV_NAME === 'development'
            ? [anvilChain, lineaSepolia, linea, lineaTestnet]
            : [lineaSepolia, linea, lineaTestnet],
});

// 从环境变量中获取合约地址并转换为 Address 类型
export const CONTRACT_ADDRESS = VITE_CONTRACT_ADDRESS;
