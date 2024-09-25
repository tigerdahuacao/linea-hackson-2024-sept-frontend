import SnapMandatory from '@/components/ScrollSnap/SnapMandatory';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { createContext, FC, ReactNode, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

export const ScrollContext = createContext<(to: number) => void>(() => {});

interface AppContainerProps {
    bgText?: string;
    children: ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({ bgText, children }) => {
    const bgTextRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useGSAP(() => {
        const bgTextElement = bgTextRef.current;
        const containerElement = containerRef.current;

        if (bgTextElement) {
            const isRoot = location.pathname === '/';

            containerElement.style.overflowY = 'hidden';

            gsap.to(bgTextElement, {
                filter: isRoot ? 'blur(0px)' : 'blur(10px)',
                top: isRoot ? '35%' : '50%',
                duration: 0.7,
                ease: 'power2.out',
                onComplete: () => {
                    setTimeout(() => {
                        containerElement.style.overflowY = 'auto';
                    }, 300);
                },
            });
        }
    }, [location]);

    const handleScroll = useCallback((to: number) => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                duration: 1,
                scrollTo: { y: to, autoKill: false },
                ease: 'power3.out',
            });
        }
    }, []);

    return (
        <ScrollContext.Provider value={handleScroll}>
            <SnapMandatory
                ref={containerRef}
                className="tw-h-full tw-w-full tw-relative tw-bg-custom-gradient tw-before-noise tw-overflow-hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {bgText ? (
                    <div
                        ref={bgTextRef}
                        className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-pointer-events-none tw-overflow-hidden"
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                    >
                        <h1 className="tw-text-[40vw] tw-font-bold tw-text-pink-default tw-font-mono">
                            {bgText}
                        </h1>
                    </div>
                ) : null}
                {children}
            </SnapMandatory>
        </ScrollContext.Provider>
    );
};

export default AppContainer;
