import { gsap } from 'gsap';
import { FC, useEffect, useRef } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import WalletButton from '@/components/Button/WalletButton';
import CapsuleTabs from '@/components/CapsuleTabs/CapsuleTabs';

import AppContainer from './AppContainer';

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
    {
        label: 'Profile',
        value: 'profile',
        path: '/profile',
    },
];

const App: FC = () => {
    const location = useLocation();
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mainElement = mainRef.current;

        if (mainElement) {
            gsap.fromTo(
                mainElement,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            );
        }
    }, [location]);

    return (
        <AppContainer bgText="ANIME">
            <header className="tw-fixed tw-flex tw-w-full tw-z-50 tw-justify-between tw-p-2">
                <div className="tw-w-1/3" />
                <div className="tw-w-1/3 tw-flex tw-justify-center">
                    <CapsuleTabs tabs={tabs} />
                </div>
                <div className="tw-w-1/3 tw-flex tw-justify-end">
                    <WalletButton />
                </div>
            </header>
            <main
                ref={mainRef}
                className="tw-w-full tw-relative tw-flex tw-flex-auto tw-flex-wrap tw-items-center tw-justify-center tw-pt-14"
            >
                <Outlet />
            </main>
        </AppContainer>
    );
};

export default App;
