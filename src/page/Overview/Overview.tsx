import { gsap } from 'gsap';
import { FC, useContext, useEffect, useRef } from 'react';

import { ScrollContext } from '../Root/AppContainer';

const Overview: FC = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleScroll = useContext(ScrollContext);

    const handleGoToVote = () => {
        handleScroll(window.innerHeight);
    };

    useEffect(() => {
        const button = buttonRef.current;
        if (button) {
            const textWrapper = button.querySelector('.text-wrapper');
            const hoverText = button.querySelector('.hover-text');

            gsap.set(hoverText, { yPercent: 100 });

            const floatAnimation = gsap.to(button, {
                y: -10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

            const handleMouseEnter = () => {
                gsap.to(textWrapper, { yPercent: -100, duration: 0.3, ease: 'power2.out' });
                floatAnimation.pause();
            };

            const handleMouseLeave = () => {
                gsap.to(textWrapper, { yPercent: 0, duration: 0.3, ease: 'power2.out' });
                floatAnimation.play();
            };

            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);

            // 清理函数
            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
                floatAnimation.kill();
            };
        }
        return undefined;
    }, []);

    return (
        <div className="tw-h-svh tw-w-svw">
            <div className="tw-h-svh tw-w-svw tw-flex tw-justify-center tw-items-end tw-snap-center">
                <button
                    ref={buttonRef}
                    className="tw-relative tw-w-60 tw-h-14 tw-font-bold tw-py-2 tw-px-4 tw-rounded-full tw-shadow-md tw-border-2 tw-border-white tw-mb-40 tw-overflow-hidden"
                    onClick={handleGoToVote}
                >
                    <div className="text-wrapper tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0">
                        <span className="default-text tw-absolute tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-sm tw-text-pink-default tw-bg-white">
                            Go Vote Now
                        </span>
                        <span className="hover-text tw-absolute tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-white tw-bg-pink-default tw-text-sm">
                            Let&apos;s Go!!!!!!
                        </span>
                    </div>
                </button>
            </div>
            <div className="tw-h-svh tw-w-svw tw-snap-center">111</div>
        </div>
    );
};

export default Overview;
