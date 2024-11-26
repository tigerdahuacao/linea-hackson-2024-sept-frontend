import { Stack } from '@mui/material';
import $styles from '@styles/modules/container.module.scss';
import { FC, useEffect, useState } from 'react';

import useContract from '@/hooks/useContract';
import { UserNFT } from '@/types/nft';

import NFTInfo from './NFTInfo';
import ProfileCard from './ProfileCard';

const Profile: FC = () => {
    const { address, chain, getUserNFTsWithMetadata } = useContract();
    const [userNFTs, setUserNFTs] = useState<UserNFT[]>([]);

    useEffect(() => {
        if (address && chain) {
            getUserNFTsWithMetadata().then((nfts) => {
                setUserNFTs(nfts);
            });
        }
    }, [address, chain]);

    return (
        <div className={$styles.app}>
            <div className={$styles.container}>
                <Stack spacing={2} sx={{ minWidth: '60vw', maxWidth: '80vw' }}>
                    <ProfileCard>
                        <div className="tw-py-2 tw-px-4">
                            <span>{address}</span>
                        </div>
                    </ProfileCard>
                    <ProfileCard title="NFT" content={<NFTInfo nfts={userNFTs} />} />
                </Stack>
            </div>
        </div>
    );
};

export default Profile;
