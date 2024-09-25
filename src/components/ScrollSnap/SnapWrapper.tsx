import { FC, ReactNode } from 'react';

const SnapWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="tw-h-svh tw-w-svw">{children}</div>;
};

export default SnapWrapper;
