import { FC } from 'react';

import SnapWrapper from '@/components/ScrollSnap/SnapWrapper';

import SnapAlign from '../../components/ScrollSnap/SnapAlign';

import HomePage from './HomePage';
import VoteCCList from './VoteList';

const Overview: FC = () => {
    return (
        <SnapWrapper>
            <SnapAlign>
                <HomePage />
            </SnapAlign>
            <SnapAlign>
                <VoteCCList />
            </SnapAlign>
        </SnapWrapper>
    );
};

export default Overview;
