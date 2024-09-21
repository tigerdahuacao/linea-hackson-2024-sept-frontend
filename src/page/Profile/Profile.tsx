import { Stack } from '@mui/material';
import $styles from '@styles/modules/container.module.scss';
import { FC } from 'react';

import NFTInfo from './NFTInfo';
import ProfileCard from './ProfileCard';

const Profile: FC = () => {
    return (
        <div className={$styles.app}>
            <div className={$styles.container}>
                <Stack spacing={2} sx={{ minWidth: '60vw', maxWidth: '80vw' }}>
                    <ProfileCard>
                        <div className="tw-py-2 tw-px-4">
                            <span>0x00000000000</span>
                        </div>
                    </ProfileCard>
                    <ProfileCard title="NFT" content={<NFTInfo />} />
                </Stack>
            </div>
        </div>
    );
};

export default Profile;
