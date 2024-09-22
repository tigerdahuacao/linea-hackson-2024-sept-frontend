import { FC, ReactNode } from 'react';

const SnapWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="tw-h-svh tw-w-svw tw-snap-center">{children}</div>;
};

export default SnapWrapper;
