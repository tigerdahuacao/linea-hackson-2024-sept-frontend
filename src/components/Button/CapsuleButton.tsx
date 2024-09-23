import { FC, ReactNode } from 'react';

const CapsuleButton: FC<{ children: ReactNode; onClick?: () => void }> = ({
    children,
    onClick,
}) => {
    return (
        <button
            type="button"
            className="tw-flex tw-items-center tw-text-xs tw-font-bold tw-rounded-full tw-bg-white tw-px-6 tw-py-[0.75rem] tw-shadow-md"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default CapsuleButton;
