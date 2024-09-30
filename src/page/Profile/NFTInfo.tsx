import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC } from 'react';

import {
    naruto1,
    naruto2,
    naruto3,
    naruto4,
    naruto5,
    naruto6,
    naruto7,
    naruto8,
} from '@/assets/images/anime/NFT-images/naruto-images';

import ProfileCard from './ProfileCard';

const NFTInfo: FC = () => {
    const NFTs = [
        {
            key: 'ntf1',
            name: 'NFT1',
            publishers: 'Publisher1',
            imageUrl: naruto1,
        },
        {
            key: 'ntf2',
            name: 'NFT2',
            publishers: 'Publisher2',
            imageUrl: naruto2,
        },
        {
            key: 'ntf3',
            name: 'NFT3',
            publishers: 'Publisher3',
            imageUrl: naruto3,
        },
        {
            key: 'ntf4',
            name: 'NFT4',
            publishers: 'Publisher4',
            imageUrl: naruto4,
        },
        {
            key: 'ntf5',
            name: 'NFT5',
            publishers: 'Publisher5',
            imageUrl: naruto5,
        },
        {
            key: 'ntf6',
            name: 'NFT6',
            publishers: 'Publisher6',
            imageUrl: naruto6,
        },
        {
            key: 'ntf7',
            name: 'NFT7',
            publishers: 'Publisher7',
            imageUrl: naruto7,
        },
        {
            key: 'ntf8',
            name: 'NFT8',
            publishers: 'Publisher8',
            imageUrl: naruto8,
        },
    ];

    return (
        <>
            <Stack className="tw-mb-2" direction="row" spacing={2}>
                <div className="tw-flex tw-flex-col">
                    <span className="tw-text-xs tw-text-gray-500">Total NFT</span>
                    <span className="tw-text-xs tw-font-bold">9</span>
                </div>
                <div className="tw-flex tw-flex-col">
                    <span className="tw-text-xs tw-text-gray-500">Total assets</span>
                    <span className="tw-text-xs tw-font-bold">$999</span>
                </div>
            </Stack>
            <Grid container spacing={2}>
                {NFTs.map((nft) => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={nft.name}>
                        <ProfileCard>
                            <div className="tw-aspect-square tw-overflow-hidden tw-relative">
                                <img
                                    className="tw-w-full tw-h-full tw-object-cover tw-absolute tw-inset-0"
                                    src={nft.imageUrl}
                                    alt={nft.name}
                                />
                            </div>
                            <div className="tw-flex tw-flex-col tw-mt-2">
                                <span className="tw-text-sm tw-font-bold">{nft.name}</span>
                                <span className="tw-text-xs">{nft.publishers}</span>
                            </div>
                        </ProfileCard>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default NFTInfo;
