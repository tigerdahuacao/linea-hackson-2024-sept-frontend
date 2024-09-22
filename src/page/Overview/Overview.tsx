import { FC } from 'react';

import HomePage from './HomePage';
import SnapWrapper from './SnapWrapper';
import VoteList from './VoteLIst';

const Overview: FC = () => {
    return (
        <div className="tw-h-svh tw-w-svw">
            <SnapWrapper>
                <HomePage />
            </SnapWrapper>
            <SnapWrapper>
                <VoteList />
            </SnapWrapper>
        </div>
    );
};

export default Overview;
