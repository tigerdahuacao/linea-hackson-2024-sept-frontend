import { FC, useContext } from 'react';

import AnimationButton from '@/components/Button/AnimationButton';

import { ScrollContext } from '../Root/AppContainer';

const HomePage: FC = () => {
    const handleScroll = useContext(ScrollContext);

    const handleGoToVote = () => {
        handleScroll(window.innerHeight);
    };

    return (
        <div className="tw-h-full tw-flex tw-justify-center tw-items-end tw-pb-40">
            <AnimationButton
                enableAnimation
                text="Go Vote Now"
                switchText="Let's Go!!!!!!"
                onClick={handleGoToVote}
            />
        </div>
    );
};

export default HomePage;
