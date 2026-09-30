import { requestAnimationFrame } from '../animation/animation-consts';
import { cancelRequestAnimationFrame } from '../request-animation';
import {
    thyOverlayMotionDurationFallbackMs,
    thyOverlayMotionDurationVar
} from './overlay-motion.constants';

export type ThyOverlayMotionPhase = 'enter-active' | 'leave-start' | 'leave-active';

export const thyOverlayMotionClass = {
    enter: 'thy-motion-enter',
    enterActive: 'thy-motion-enter-active',
    leave: 'thy-motion-leave',
    leaveActive: 'thy-motion-leave-active'
} as const;

export type ThyOverlayMotionPhaseListener = (phase: ThyOverlayMotionPhase) => void;

type MotionCleanup = () => void;
type OverlayMotionKind = 'enter' | 'leave';

export function prefersReducedMotion(): boolean {
    return (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

export function parseMotionDurationMs(value: string | null | undefined, fallbackMs: number): number {
    if (!value) {
        return fallbackMs;
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return fallbackMs;
    }
    if (trimmed.endsWith('ms')) {
        const ms = Number.parseFloat(trimmed.slice(0, -2));
        return Number.isFinite(ms) ? ms : fallbackMs;
    }
    if (trimmed.endsWith('s')) {
        const s = Number.parseFloat(trimmed.slice(0, -1));
        return Number.isFinite(s) ? s * 1000 : fallbackMs;
    }
    const n = Number.parseFloat(trimmed);
    return Number.isFinite(n) ? n : fallbackMs;
}

export function readOverlayMotionDurationMs(element: HTMLElement, type: 'enter' | 'leave'): number {
    const variable =
        type === 'enter' ? thyOverlayMotionDurationVar.enter : thyOverlayMotionDurationVar.leave;
    const fallback =
        type === 'enter'
            ? thyOverlayMotionDurationFallbackMs.enter
            : thyOverlayMotionDurationFallbackMs.leave;
    if (typeof getComputedStyle !== 'function') {
        return fallback;
    }
    return parseMotionDurationMs(getComputedStyle(element).getPropertyValue(variable), fallback);
}

export function clearOverlayMotionClasses(element: HTMLElement): void {
    element.classList.remove(
        thyOverlayMotionClass.enter,
        thyOverlayMotionClass.enterActive,
        thyOverlayMotionClass.leave,
        thyOverlayMotionClass.leaveActive
    );
}

/** Initial hidden frame before enter-active (call as early as attach). */
export function prepareOverlayEnter(element: HTMLElement): void {
    element.classList.remove(
        thyOverlayMotionClass.enterActive,
        thyOverlayMotionClass.leave,
        thyOverlayMotionClass.leaveActive
    );
    element.classList.add(thyOverlayMotionClass.enter);
}

export function prepareOverlayLeave(element: HTMLElement): void {
    element.classList.remove(thyOverlayMotionClass.enterActive, thyOverlayMotionClass.leaveActive);
    element.classList.remove(thyOverlayMotionClass.enter);
    element.classList.add(thyOverlayMotionClass.leave);
}

function watchHostAnimation(element: HTMLElement, durationMs: number, onComplete: () => void): MotionCleanup {
    let finished = false;

    const complete = () => {
        if (finished) {
            return;
        }
        finished = true;
        element.removeEventListener('animationend', onAnimationEvent);
        element.removeEventListener('animationcancel', onAnimationEvent);
        clearTimeout(fallbackTimer);
        onComplete();
    };

    const onAnimationEvent = (event: AnimationEvent) => {
        if (event.target !== element) {
            return;
        }
        complete();
    };

    element.addEventListener('animationend', onAnimationEvent);
    element.addEventListener('animationcancel', onAnimationEvent);
    const fallbackTimer = setTimeout(complete, durationMs + 100);

    return () => {
        if (finished) {
            return;
        }
        finished = true;
        element.removeEventListener('animationend', onAnimationEvent);
        element.removeEventListener('animationcancel', onAnimationEvent);
        clearTimeout(fallbackTimer);
    };
}

function runOverlayMotionAnimation(
    element: HTMLElement,
    kind: OverlayMotionKind,
    enabled: boolean,
    onPhase: ThyOverlayMotionPhaseListener
): MotionCleanup {
    const donePhase: ThyOverlayMotionPhase = kind === 'enter' ? 'enter-active' : 'leave-active';

    if (kind === 'leave') {
        onPhase('leave-start');
    }

    if (!enabled) {
        clearOverlayMotionClasses(element);
        Promise.resolve().then(() => onPhase(donePhase));
        return () => {};
    }

    if (kind === 'enter') {
        prepareOverlayEnter(element);
    } else {
        prepareOverlayLeave(element);
    }

    let cancelWatch: MotionCleanup = () => {};
    const frameId = requestAnimationFrame(() => {
        element.classList.add(
            kind === 'enter' ? thyOverlayMotionClass.enterActive : thyOverlayMotionClass.leaveActive
        );
        const durationMs = readOverlayMotionDurationMs(element, kind);
        cancelWatch = watchHostAnimation(element, durationMs, () => {
            clearOverlayMotionClasses(element);
            onPhase(donePhase);
        });
    });

    return () => {
        cancelRequestAnimationFrame(frameId as number);
        cancelWatch();
        clearOverlayMotionClasses(element);
    };
}

export function runOverlayEnterAnimation(
    element: HTMLElement,
    enabled: boolean,
    onPhase: ThyOverlayMotionPhaseListener
): MotionCleanup {
    return runOverlayMotionAnimation(element, 'enter', enabled, onPhase);
}

export function runOverlayLeaveAnimation(
    element: HTMLElement,
    enabled: boolean,
    onPhase: ThyOverlayMotionPhaseListener
): MotionCleanup {
    return runOverlayMotionAnimation(element, 'leave', enabled, onPhase);
}

/** Holds at most one in-flight enter/leave animation and cancels it on destroy or phase switch. */
export class ThyOverlayMotionSession {
    private cancelActive: MotionCleanup = () => {};

    cancel(): void {
        this.cancelActive();
        this.cancelActive = () => {};
    }

    enter(element: HTMLElement, enabled: boolean, onPhase: ThyOverlayMotionPhaseListener): void {
        this.cancel();
        this.cancelActive = runOverlayEnterAnimation(element, enabled, onPhase);
    }

    leave(element: HTMLElement, enabled: boolean, onPhase: ThyOverlayMotionPhaseListener): void {
        this.cancel();
        this.cancelActive = runOverlayLeaveAnimation(element, enabled, onPhase);
    }
}
