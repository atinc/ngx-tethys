import { state, style, trigger, AnimationTriggerMetadata } from '@angular/animations';

const animationBody = [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues. translate(-300px,-100px)
    state('void, exit', style({})),
    state('enter', style({ transform: 'none' }))
];

/**
 * Animations used by ThyNotify.
 * @docs-private
 */
export const thyNotifyAnimations: {
    readonly notifyContainer: AnimationTriggerMetadata;
} = {
    notifyContainer: trigger('notifyContainer', animationBody)
};

// export const setAnimationStart
