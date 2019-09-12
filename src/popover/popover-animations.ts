import {
    animate,
    state,
    style,
    transition,
    trigger,
    AnimationTriggerMetadata,
    useAnimation,
    animation
} from '@angular/animations';

// tslint:disable-next-line:max-line-length
const enterAnimation = animation([
    style({ opacity: 0, transform: ' {{ transform }}' }),
    animate('200ms cubic-bezier(0.65, 0.05, 0.36, 1)')
]);
const leaveAnimation = animation([
    animate('200ms cubic-bezier(0.65, 0.05, 0.36, 1)', style({ opacity: 0, transform: '{{ transform }}' }))
]);
const animationBody = [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues. translate(-300px,-100px)
    state('void', style({ opacity: 0, transform: 'none' })),
    transition(
        'void => top , void => topLeft , void => topRight',
        useAnimation(enterAnimation, {
            params: {
                transform: 'translateY(15px)'
            }
        })
    ),
    transition(
        'void => bottom , void => bottomLeft , void => bottomRight',
        useAnimation(enterAnimation, {
            params: {
                transform: 'translateY(-15px)'
            }
        })
    ),
    transition(
        'void => left , void => leftTop , void => leftBottom',
        useAnimation(enterAnimation, {
            params: {
                transform: 'translateX(15px)'
            }
        })
    ),
    transition(
        'void => right , void => rightTop , void => rightBottom',
        useAnimation(enterAnimation, {
            params: {
                transform: 'translateX(-15px)'
            }
        })
    ),
    transition(
        'top => void , topLeft => void , topRight => void',
        useAnimation(leaveAnimation, {
            params: {
                transform: 'translateY(15px)'
            }
        })
    ),
    transition(
        'bottom => void , bottomLeft => void, bottomRight => void',
        useAnimation(leaveAnimation, {
            params: {
                transform: 'translateY(-15px)'
            }
        })
    ),
    transition(
        'left => void, leftTop =>  void, leftBottom => void',
        useAnimation(leaveAnimation, {
            params: {
                transform: 'translateX(15px)'
            }
        })
    ),
    transition(
        'right => void , rightTop => void , rightBottom => void',
        useAnimation(leaveAnimation, {
            params: {
                transform: 'translateX(-15px)'
            }
        })
    )
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
