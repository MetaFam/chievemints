import { PrimitiveProps } from '@react-three/fiber';
export declare const Model: ({ model, group: groupProps, ...props }: {
    model: string;
    group: Record<string, (() => void)>;
    props?: PrimitiveProps;
}) => JSX.Element;
export declare const ThreeDScene: ({ model, className, bg }: {
    model: string;
    className?: string;
    bg?: string;
}) => JSX.Element;
