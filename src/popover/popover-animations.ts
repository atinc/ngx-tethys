import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';

const animationBody = [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues. translate(-300px,-100px)
    state('void', style({ opacity: 0, transform: 'none' })),
    // state('exit', style({ opacity: 0, transform: 'none' })),
    state('top , topLeft , topRight', style({ opacity: 0, transform: 'translateY(15px)' })),
    state('bottom , bottomLeft , bottomRight', style({ opacity: 0, transform: 'translateY(-15px)' })),
    state('left , leftTop , leftBottom', style({ opacity: 0, transform: 'translateX(15px)' })),
    state('right , rightTop , rightBottom', style({ opacity: 0, transform: 'translateX(-15px)' })),

    state('enter', style({ transform: 'none', opacity: 1 })),
    transition('* => enter', animate('200ms cubic-bezier(0.65, 0.05, 0.36, 1)')),
    transition('enter => *', animate('300ms cubic-bezier(0.65, 0.05, 0.36, 1)'))

    // transition(
    //     '* => exit',
    //     animate('150ms cubic-bezier(0.24, 0.18, 0.96, 0.52)', style({ transform: 'scale(0.3)', opacity: 0 }))
    // )
];

/**
 * Animations used by ThyPopover.
 * @docs-private
 */
export const thyPopoverAnimations: {
    readonly popoverContainer: AnimationTriggerMetadata;
} = {
    popoverContainer: trigger('popoverContainer', animationBody)
};

// export const setAnimationStart
