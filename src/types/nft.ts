const NARUTO_NFT_ID = 1;
const SASUKE_NFT_ID = 2;
const SAKURA_NFT_ID = 3;

export const NFT_IDS = [NARUTO_NFT_ID, SASUKE_NFT_ID, SAKURA_NFT_ID];

export type NFTId = number;

export interface NFTMetadata {
    name: string;
    description: string;
    image: string;
    attributes?: Array<{
        trait_type: string;
        value: string | number;
    }>;
}

export interface NFTData {
    id: NFTId;
    totalMinted: bigint;
    maxSupply: bigint;
    mintPrice: string;
    uri: string;
    metadata: NFTMetadata;
    available: bigint;
}

export interface UserNFT {
    id: NFTId;
    balance: bigint;
    uri: string;
    metadata: NFTMetadata;
}
