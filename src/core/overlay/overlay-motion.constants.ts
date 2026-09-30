/** CSS custom properties consumed by overlay motion styles (keep in sync with overlay-motion.scss). */
export const thyOverlayMotionDurationVar = {
    enter: '--thy-motion-duration-enter',
    leave: '--thy-motion-duration-leave'
} as const;

/** Fallback when computed style is missing (SSR / tests). */
export const thyOverlayMotionDurationFallbackMs = {
    enter: 200,
    leave: 150
} as const;
