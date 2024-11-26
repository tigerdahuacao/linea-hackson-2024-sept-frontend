import { useCallback } from 'react';
import { Address, formatEther } from 'viem';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';

import { WriteContractErrorType, WriteContractReturnType } from 'wagmi/actions';

import AnimeRoleABI from '@/config/abi/AnimeRole.json';
import { CONTRACT_ADDRESS } from '@/config/networks';
import { NFTData, NFTId, NFTMetadata, NFT_IDS, UserNFT } from '@/types/nft';

const contract = {
    address: CONTRACT_ADDRESS,
    abi: AnimeRoleABI.abi,
} as const;

export default function useContract() {
    const { address, chain } = useAccount();
    const publicClient = usePublicClient();
    const { writeContractAsync } = useWriteContract();

    const readContract = useCallback(
        async <T>(functionName: string, args: unknown[]): Promise<T> => {
            const result = await publicClient.readContract({
                ...contract,
                functionName,
                args,
            });
            return result as T;
        },
        [publicClient],
    );

    const getNFTBalance = useCallback(
        (nftId: NFTId): Promise<bigint> =>
            readContract('balanceOf', [address as Address, BigInt(nftId)]),
        [address, readContract],
    );

    const getNFTTotalMinted = useCallback(
        (nftId: NFTId): Promise<bigint> => readContract('totalMinted', [BigInt(nftId)]),
        [readContract],
    );

    const getNFTUserTotalMinted = useCallback(
        (nftId: NFTId): Promise<bigint> =>
            readContract('userTotalMinted', [address as Address, BigInt(nftId)]),
        [address, readContract],
    );

    const getNFTMaxSupply = useCallback(
        (nftId: NFTId): Promise<bigint> => readContract('maxSupply', [BigInt(nftId)]),
        [readContract],
    );

    const getNFTMintPrice = useCallback(
        (nftId: NFTId): Promise<bigint> => readContract('mintPrice', [BigInt(nftId)]),
        [readContract],
    );

    const getNFTUri = useCallback(
        (nftId: NFTId): Promise<string> => readContract('animeRoleURIs', [BigInt(nftId)]),
        [readContract],
    );

    const getNFTMetadata = useCallback(async (uri: string): Promise<NFTMetadata> => {
        try {
            // If the URI starts with ipfs://, convert it to an HTTP address
            const url = uri.startsWith('ipfs://')
                ? uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
                : uri;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to obtain NFT metadata');
            }

            return data as NFTMetadata;
        } catch (error) {
            console.error('Error getting NFT metadata:', error);
            throw error;
        }
    }, []);

    const getAllNFTs = useCallback(async (): Promise<NFTData[]> => {
        const nfts = await Promise.all(
            NFT_IDS.map(async (nftId) => {
                const [totalMinted, maxSupply, mintPrice, uri] = await Promise.all([
                    getNFTTotalMinted(nftId),
                    getNFTMaxSupply(nftId),
                    getNFTMintPrice(nftId),
                    getNFTUri(nftId),
                ]);
                const metadata = await getNFTMetadata(uri);

                return {
                    id: nftId,
                    totalMinted,
                    maxSupply,
                    mintPrice: formatEther(mintPrice),
                    uri,
                    metadata,
                    available: maxSupply - totalMinted,
                };
            }),
        );

        return nfts;
    }, [getNFTTotalMinted, getNFTMaxSupply, getNFTMintPrice, getNFTUri, getNFTMetadata]);

    const getUserMintedNFTs = useCallback(async (): Promise<Array<Omit<UserNFT, 'metadata'>>> => {
        const userNFTs: Array<Omit<UserNFT, 'metadata'>> = [];

        for (const nftId of NFT_IDS) {
            const balance = await getNFTBalance(nftId);
            if (balance > 0n) {
                const [uri] = await Promise.all([getNFTUri(nftId)]);
                userNFTs.push({
                    id: nftId,
                    balance,
                    uri,
                });
            }
        }

        return userNFTs;
    }, [getNFTBalance, getNFTUri]);

    const getUserNFTsWithMetadata = useCallback(async (): Promise<UserNFT[]> => {
        const userNFTs = await getUserMintedNFTs();
        const nftsWithMetadata = await Promise.all(
            userNFTs.map(async (nft) => {
                const metadata = await getNFTMetadata(nft.uri);
                return {
                    ...nft,
                    metadata,
                };
            }),
        );
        return nftsWithMetadata;
    }, [getUserMintedNFTs, getNFTMetadata]);

    const mintNft = useCallback(
        async ({
            nftId,
            count,
            onSuccess,
            onError,
        }: {
            nftId: NFTId;
            count: number;
            onSuccess?: (data: WriteContractReturnType) => void;
            onError?: (error: WriteContractErrorType) => void;
        }) => {
            const price = await getNFTMintPrice(nftId);
            const value = price * BigInt(count);

            return writeContractAsync({
                ...contract,
                value,
                chain,
                account: address,
                functionName: 'mintAnimeRoleNft',
                args: [BigInt(nftId), BigInt(count)],
                onSuccess,
                onError,
            });
        },
        [address, chain, getNFTMintPrice, writeContractAsync],
    );

    return {
        address,
        chain,
        getNFTBalance,
        getNFTTotalMinted,
        getNFTUserTotalMinted,
        getNFTMaxSupply,
        getNFTMintPrice,
        getNFTUri,
        mintNft,
        getUserMintedNFTs,
        getAllNFTs,
        getUserNFTsWithMetadata,
    };
}
