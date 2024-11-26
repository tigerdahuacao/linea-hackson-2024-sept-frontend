import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC } from 'react';

import { UserNFT } from '@/types/nft';

import ProfileCard from './ProfileCard';

const NFTInfo: FC<{ nfts: UserNFT[] }> = ({ nfts }) => {
    const TotalNFTsCount = nfts.reduce((a, b) => a + Number(b.balance), 0);

    return (
        <>
            <Stack className="tw-mb-2" direction="row" spacing={2}>
                <div className="tw-flex tw-flex-col">
                    <span className="tw-text-xs tw-text-gray-500">Total NFT</span>
                    <span className="tw-text-xs tw-font-bold">{TotalNFTsCount}</span>
                </div>
                {/* <div className="tw-flex tw-flex-col">
                    <span className="tw-text-xs tw-text-gray-500">Total assets</span>
                    <span className="tw-text-xs tw-font-bold">$999</span>
                </div> */}
            </Stack>
            {nfts.length > 0 ? (
                <Grid container spacing={2}>
                    {nfts.map((nft) => (
                        <Grid size={{ xs: 6, sm: 4, md: 2 }} key={nft.id}>
                            <ProfileCard badgeContent={nft.balance.toString()}>
                                <div className="tw-aspect-square tw-overflow-hidden tw-relative">
                                    <img
                                        className="tw-w-full tw-h-full tw-object-cover tw-absolute tw-inset-0"
                                        src={nft.metadata.image}
                                        alt={nft.metadata.name}
                                    />
                                </div>
                                <div className="tw-flex tw-flex-col tw-mt-2 tw-truncate">
                                    <span className="tw-text-sm tw-font-bold">
                                        {nft.metadata.name} #{nft.id}
                                    </span>
                                    <span className="tw-text-xs tw-truncate">
                                        {nft.metadata.description}
                                    </span>
                                </div>
                            </ProfileCard>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <p className="text-center text-muted-foreground">No NFTs to display</p>
            )}
        </>
    );
};

export default NFTInfo;
