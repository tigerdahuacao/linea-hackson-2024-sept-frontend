import { Stack } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import CapsuleButton from './CapsuleButton';

const WalletButton = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === 'authenticated');
                return (
                    <div
                        className="tw-flex tw-items-center"
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <CapsuleButton onClick={openConnectModal}>
                                        <span className="tw-text-pink-default hover:tw-opacity-80 tw-transition-opacity">
                                            Connect Wallet
                                        </span>
                                    </CapsuleButton>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <CapsuleButton onClick={openConnectModal}>
                                        <span className="tw-text-red-500 hover:tw-opacity-80 tw-transition-opacity">
                                            Wrong network
                                        </span>
                                    </CapsuleButton>
                                );
                            }
                            return (
                                <Stack direction="row" spacing={2}>
                                    <CapsuleButton onClick={openChainModal}>
                                        {chain.hasIcon && (
                                            <div
                                                className="tw-h-4 tw-w-4 tw-rounded-full tw-overflow-hidden tw-mr-2"
                                                style={{
                                                    background: chain.iconBackground,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        src={chain.iconUrl}
                                                        alt={chain.name ?? 'Chain icon'}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <span className="tw-text-xs tw-font-bold">
                                            {chain.name}
                                        </span>
                                    </CapsuleButton>
                                    <CapsuleButton onClick={openAccountModal}>
                                        <Stack
                                            className="tw-text-xs tw-font-bold"
                                            direction="row"
                                            spacing={2}
                                        >
                                            {account.displayBalance && (
                                                <span>{account.displayBalance}</span>
                                            )}
                                            <Stack
                                                className="tw-items-center"
                                                direction="row"
                                                spacing={1}
                                            >
                                                <Stack className="tw-items-center tw-justify-center tw-bg-orange-500 tw-rounded-full">
                                                    🦊
                                                </Stack>
                                                <span>{account.displayName}</span>
                                            </Stack>
                                        </Stack>
                                    </CapsuleButton>
                                </Stack>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default WalletButton;
