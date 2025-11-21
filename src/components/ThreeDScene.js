import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import LoggingErrorBoundary from './LoggingErrorBoundary';
export const Model = ({ model, group: groupProps, ...props }) => {
    const { scene } = useGLTF(model);
    return (React.createElement("group", { ...groupProps },
        React.createElement("primitive", { ...props, object: scene })));
};
export const ThreeDScene = ({ model, className = null, bg = null }) => {
    const [paused, setPaused] = React.useState(false);
    let args = null;
    if (bg) {
        args = (bg.match(/../g)
            .map((num) => Number(`0x${num}`) / 255)
            .slice(0, 3));
    }
    return (React.createElement(Suspense, { fallback: null },
        React.createElement(LoggingErrorBoundary, null,
            React.createElement("section", { className },
                React.createElement(Canvas, null,
                    args?.length === 3 && (React.createElement("color", { attach: "background", args })),
                    React.createElement("ambientLight", { intensity: 0.2 }),
                    React.createElement("directionalLight", { intensity: 0.75, position: [0, 0, 5] }),
                    React.createElement(Model, { model, group: {
                            onPointerEnter: () => setPaused(true),
                            onPointerLeave: () => setPaused(false),
                        } }),
                    React.createElement(OrbitControls, { autoRotate: !paused, autoRotateSpeed: 3.5, makeDefault: true }))))));
};
//# sourceMappingURL=ThreeDScene.js.map