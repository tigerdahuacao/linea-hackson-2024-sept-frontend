import { FC, ReactNode } from 'react';

const SnapAlign: FC<{ className?: string; children: ReactNode }> = ({ className, children }) => {
    return (
        <div className={`tw-h-svh tw-w-svw tw-snap-center tw-pt-14 ${className || ''}`}>
            {children}
        </div>
    );
};

export default SnapAlign;
