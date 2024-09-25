import { CSSProperties, ReactNode, forwardRef } from 'react';

interface SnapMandatoryProps {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

const SnapMandatory = forwardRef<HTMLDivElement, SnapMandatoryProps>(
    ({ className, style, children }, ref) => {
        return (
            <div
                ref={ref}
                className={`tw-snap-y tw-snap-mandatory ${className || ''}`}
                style={style}
            >
                {children}
            </div>
        );
    },
);

SnapMandatory.displayName = 'SnapMandatory';

export default SnapMandatory;
