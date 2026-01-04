import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animation-consts';

export const thyAnimationZoom = {
    scaleXEnter: 'thy-scale-x-enter',
    scaleXLeave: 'thy-scale-x-leave',

    scaleYEnter: 'thy-scale-y-enter',
    scaleYLeave: 'thy-scale-y-leave',

    scaleEnter: 'thy-scale-enter',
    scaleLeave: 'thy-scale-leave'
};

/**
 * @deprecated Please use the new Angular animate.enter and animate.leave APIs.
 * @see https://angular.dev/guide/animations
 */
export const scaleXMotion: AnimationTriggerMetadata = trigger('scaleXMotion', [
    transition('* => enter', [
        style({
            opacity: 0,
            transform: 'scaleX(0.9)'
        }),
        animate(
            `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
            style({
                opacity: 1,
                transform: 'scaleX(1)'
            })
        )
    ]),
    transition('enter => *', [
        style({
            opacity: 1,
            transform: 'scaleX(1)'
        }),
        animate(
            `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
            style({
                opacity: 0,
                transform: 'scaleX(0.9)'
            })
        )
    ])
]);

/**
 * @deprecated Please use the new Angular animate.enter and animate.leave APIs.
 * @see https://angular.dev/guide/animations
 */
export const scaleYMotion: AnimationTriggerMetadata = trigger('scaleYMotion', [
    transition('* => enter', [
        style({
            opacity: 0,
            transform: 'scaleY(0.9)'
        }),
        animate(
            `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
            style({
                opacity: 1,
                transform: 'scaleY(1)'
            })
        )
    ]),
    transition('enter => *', [
        style({
            opacity: 1,
            transform: 'scaleY(1)'
        }),
        animate(
            `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
            style({
                opacity: 0,
                transform: 'scaleY(0.9)'
            })
        )
    ])
]);

/**
 * @deprecated Please use the new Angular animate.enter and animate.leave APIs.
 * @see https://angular.dev/guide/animations
 */
export const scaleMotion: AnimationTriggerMetadata = trigger('scaleMotion', [
    transition('* => enter', [
        style({ opacity: 0, transform: 'scale(0.9, 0.9)' }),
        animate(
            `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
            style({
                opacity: 1,
                transform: 'scale(1, 1)'
            })
        )
    ]),
    transition('enter => *', [
        style({ opacity: 1, transform: 'scale(1, 1)' }),
        animate(
            `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
            style({
                opacity: 0,
                transform: 'scale(0.9, 0.9)'
            })
        )
    ])
]);
