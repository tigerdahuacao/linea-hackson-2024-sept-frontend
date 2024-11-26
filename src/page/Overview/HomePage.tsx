import { FC, useContext } from 'react';
import { useAccount } from 'wagmi';

import AnimationButton from '@/components/Button/AnimationButton';
import WalletButton from '@/components/Button/WalletButton';

import { ScrollContext } from '../Root/AppContainer';

const HomePage: FC = () => {
    const handleScroll = useContext(ScrollContext);
    const { isConnected } = useAccount();

    const handleGoToVote = () => {
        handleScroll(window.innerHeight);
    };

    return (
        <div className="tw-h-full tw-flex tw-justify-center tw-items-end tw-pb-40">
            {isConnected ? (
                <AnimationButton
                    enableAnimation
                    text="Go Vote Now"
                    switchText="Let's Go!!!!!!"
                    onClick={handleGoToVote}
                />
            ) : (
                <WalletButton fontSize="lg" />
            )}
        </div>
    );
};

export default HomePage;
