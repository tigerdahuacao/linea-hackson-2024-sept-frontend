import { FC, useEffect, useState } from 'react';

import { useAccount } from 'wagmi';

import SnapWrapper from '@/components/ScrollSnap/SnapWrapper';
import useContract from '@/hooks/useContract';
import { NFTData, NFTId } from '@/types/nft';

import SnapAlign from '../../components/ScrollSnap/SnapAlign';

import HomePage from './HomePage';
import VoteList from './VoteList';

const Overview: FC = () => {
    const { isConnected } = useAccount();
    const { getAllNFTs, mintNft } = useContract();
    const [nfts, setNfts] = useState<NFTData[]>([]);

    useEffect(() => {
        getAllNFTs().then(setNfts);
    }, [getAllNFTs]);

    const handleVote = async (nftId: NFTId) => {
        await mintNft({
            nftId,
            count: 1,
        });

        getAllNFTs().then(setNfts);
    };

    return (
        <SnapWrapper>
            <SnapAlign>
                <HomePage />
            </SnapAlign>
            {isConnected && (
                <SnapAlign>
                    <VoteList nfts={nfts} onVote={handleVote} />
                </SnapAlign>
            )}
        </SnapWrapper>
    );
};

export default Overview;
