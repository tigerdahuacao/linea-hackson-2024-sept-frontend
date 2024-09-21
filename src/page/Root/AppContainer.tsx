import { gsap } from 'gsap';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AppContainerProps {
    bgText?: string;
    children: ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({ bgText, children }) => {
    const bgTextRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (bgTextRef.current) {
            const isRoot = location.pathname === '/';
            gsap.to(bgTextRef.current, {
                filter: isRoot ? 'blur(0px)' : 'blur(10px)',
                duration: 0.7,
                ease: 'power2.out',
            });
        }
    }, [location]);

    return (
        <div className="tw-h-full tw-w-full tw-relative tw-bg-custom-gradient tw-before-noise tw-overflow-auto">
            {bgText ? (
                <div
                    ref={bgTextRef}
                    className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-pointer-events-none tw-overflow-hidden"
                >
                    <h1 className="tw-text-[40vw] tw-font-bold tw-text-pink-default tw-font-mono">
                        {bgText}
                    </h1>
                </div>
            ) : null}
            {children}
        </div>
    );
};

export default AppContainer;
