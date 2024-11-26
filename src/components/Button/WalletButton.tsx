import { Stack } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC } from 'react';

import { useAutoLogin } from '@/hooks/useAutoLogin';

import CapsuleButton from './CapsuleButton';

interface WalletButtonProps {
    padding?: number | number[];
    fontSize?: string;
    className?: string;
}

const WalletButton: FC<WalletButtonProps> = ({ padding, fontSize, className }) => {
    const { isLoading } = useAutoLogin();

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
                    (!authenticationStatus || authenticationStatus === 'authenticated') &&
                    !isLoading;

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
                                    <CapsuleButton
                                        padding={padding}
                                        fontSize={fontSize}
                                        className={`tw-text-pink-default hover:tw-opacity-80 tw-transition-opacity ${className || ''}`}
                                        onClick={openConnectModal}
                                    >
                                        Connect Wallet
                                    </CapsuleButton>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <CapsuleButton
                                        padding={padding}
                                        fontSize={fontSize}
                                        className={`tw-text-red-500 hover:tw-opacity-80 tw-transition-opacity ${className || ''}`}
                                        onClick={openConnectModal}
                                    >
                                        Wrong network
                                    </CapsuleButton>
                                );
                            }
                            return (
                                <Stack direction="row" spacing={2}>
                                    <CapsuleButton
                                        padding={padding}
                                        fontSize={fontSize}
                                        className={className}
                                        onClick={openChainModal}
                                    >
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
                                    <CapsuleButton
                                        padding={padding}
                                        fontSize={fontSize}
                                        className={className}
                                        onClick={openAccountModal}
                                    >
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
