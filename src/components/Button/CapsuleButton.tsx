import { FC, ReactNode, useMemo } from 'react';

const CapsuleButton: FC<{
    padding?: number | number[];
    fontSize?: string;
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}> = ({ padding, fontSize, className, children, onClick }) => {
    const fontSizeClass = fontSize ? `tw-text-${fontSize}` : 'tw-text-xs';

    const paddingClass = useMemo(() => {
        let style = 'tw-px-6 tw-py-[0.75rem]';
        if (padding) {
            if (Array.isArray(padding)) {
                style = `tw-px-${padding[0]} tw-py-${padding[1]}`;
            } else {
                style = `tw-p-${padding}`;
            }
        }
        return style;
    }, [padding]);

    return (
        <button
            type="button"
            className={`tw-flex tw-items-center ${fontSizeClass} tw-font-bold tw-rounded-full tw-bg-white ${paddingClass} tw-shadow-md ${className || ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default CapsuleButton;
