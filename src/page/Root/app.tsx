import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import WalletButton from '@/components/Button/WalletButton';
import CapsuleTabs from '@/components/CapsuleTabs/CapsuleTabs';

const tabs = [
    {
        label: 'Overview',
        value: 'overview',
        path: '/',
    },
    {
        label: 'Vote',
        value: 'vote',
        path: '/vote-for-naruto',
    },
];

const App: FC = () => {
    return (
        <div className="tw-h-full tw-w-full tw-relative tw-bg-custom-gradient tw-before-noise">
            <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-pointer-events-none tw-overflow-hidden">
                <h1 className="tw-text-[40vw] tw-font-bold tw-text-pink-default tw-font-mono">
                    ANIME
                </h1>
            </div>
            <header className="tw-fixed tw-flex tw-w-full tw-z-50 tw-justify-between tw-p-2">
                <div className="tw-w-1/3" />
                <div className="tw-w-1/3 tw-flex tw-justify-center">
                    <CapsuleTabs tabs={tabs} />
                </div>
                <div className="tw-w-1/3 tw-flex tw-justify-end">
                    <WalletButton />
                </div>
            </header>
            <main className="tw-h-full tw-w-full tw-relative tw-flex tw-flex-auto tw-flex-wrap tw-items-center tw-justify-center">
                <Outlet />
            </main>
        </div>
    );
};

export default App;
