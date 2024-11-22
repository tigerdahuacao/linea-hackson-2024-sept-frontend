import { useGSAP } from '@gsap/react';
import { Stack } from '@mui/material';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FC, useRef } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { WagmiProvider } from 'wagmi';
import { mainnet, lineaSepolia, linea, lineaTestnet } from 'wagmi/chains';

import StoreButton from '@/components/Button/StoreButton';
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
    // For show an display error
    {
        label: 'Vote-old',
        value: 'vote-old',
        path: '/vote-for-naruto-old',
    },
    {
        label: 'Profile',
        value: 'profile',
        path: '/profile',
    },
];

const config = getDefaultConfig({
    appName: 'Hello Web3',
    projectId: '11111',
    chains: [mainnet, lineaSepolia, linea, lineaTestnet],
});

gsap.registerPlugin(ScrollTrigger, useGSAP);

const App: FC = () => {
    const queryClient = new QueryClient();

    const location = useLocation();
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <Stack
                            direction="row"
                            className="tw-fixed tw-w-full tw-z-50 tw-justify-between tw-p-2"
                        >
                            <div className="tw-w-1/3" />
                            <Stack direction="row" className="tw-w-1/3 tw-justify-center">
                                <CapsuleTabs tabs={tabs} />
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={2}
                                className="tw-w-1/3 tw-items-center tw-justify-end"
                            >
                                <StoreButton />
                                <WalletButton />
                            </Stack>
                        </Stack>
                        <Stack
                            ref={mainRef}
                            direction="row"
                            className="tw-w-full tw-relative tw-flex-auto tw-flex-wrap tw-items-center tw-justify-center"
                        >
                            <Outlet />
                        </Stack>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </AppContainer>
    );
};

export default App;
