import {
    animate,
    state,
    style,
    transition,
    trigger,
    AnimationTriggerMetadata
} from '@angular/animations';

const animationBody = [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues. translate(-300px,-100px)
    state('void, exit', style({ opacity: 0, transform: 'scale(0.1)' })),
    state('enter', style({ transform: 'none' })),
    transition(
        '* => enter',
        animate(
            '200ms cubic-bezier(0, 0, 0.57, 1)',
            style({ transform: 'none', opacity: 1 })
        )
    ),
    transition(
        '* => void, * => exit',
        animate('150ms cubic-bezier(0.24, 0.18, 0.96, 0.52)', style({ transform: 'scale(0.3)', opacity: 0 }))
    )
];

/**
 * Animations used by MatDialog.
 * @docs-private
 */
export const thyDialogAnimations: {
    readonly dialogContainer: AnimationTriggerMetadata;
} = {
   dialogContainer: trigger('dialogContainer', animationBody),
};

// export const setAnimationStart
