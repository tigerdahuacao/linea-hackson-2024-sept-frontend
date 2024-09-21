import { FC } from 'react';

const WalletButton: FC = () => {
    return (
        <button className="tw-bg-white tw-rounded-full tw-py-2 tw-px-4 tw-shadow-md tw-text-pink-default tw-text-xs tw-font-bold">
            <span className="hover:tw-opacity-80 tw-transition-opacity">Connect Wallet</span>
        </button>
    );
};

export default WalletButton;
