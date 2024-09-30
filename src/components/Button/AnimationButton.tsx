import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { FC, useRef } from 'react';

const AnimationButton: FC<{
    h?: number;
    w?: number;
    text: string;
    switchText?: string;
    enableAnimation?: boolean;
    onClick?: () => void;
}> = ({ h = 14, w = 60, text, switchText = text, enableAnimation, onClick }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useGSAP(() => {
        const button = buttonRef.current;
        if (button) {
            const textWrapper = button.querySelector('.text-wrapper');
            const hoverText = button.querySelector('.hover-text');

            gsap.set(hoverText, { yPercent: 100 });

            let floatAnimation: gsap.core.Tween | null = null;

            if (enableAnimation) {
                floatAnimation = gsap.to(button, {
                    y: -10,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut',
                });
            }

            const handleMouseEnter = () => {
                gsap.to(textWrapper, { yPercent: -100, duration: 0.3, ease: 'power2.out' });
                floatAnimation?.pause();
            };

            const handleMouseLeave = () => {
                gsap.to(textWrapper, { yPercent: 0, duration: 0.3, ease: 'power2.out' });
                floatAnimation?.play();
            };

            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);

            // 清理函数
            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
                floatAnimation?.kill();
            };
        }
        return undefined;
    });

    return (
        <button
            ref={buttonRef}
            className="tw-relative tw-font-bold tw-py-2 tw-px-4 tw-rounded-full tw-shadow-md tw-border-2 tw-border-white tw-overflow-hidden"
            style={{ width: `${w / 4}rem`, height: `${h / 4}rem` }}
            onClick={onClick}
        >
            <div className="text-wrapper tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0">
                <span className="default-text tw-absolute tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-sm tw-text-pink-default tw-bg-white">
                    {text}
                </span>
                <span className="hover-text tw-absolute tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-white tw-bg-pink-default tw-text-sm">
                    {switchText}
                </span>
            </div>
        </button>
    );
};

export default AnimationButton;
