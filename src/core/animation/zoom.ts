import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animation-consts';

// The animation starts from the line and eases in and out to the left or right.
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

// The animation starts from the line and eases in and out upward or downward.
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

// The animation starts from the point and eases in and out.
export const scaleMotion: AnimationTriggerMetadata = trigger('scaleMotion', [
    transition('* => enter', [
        style({ opacity: 0, transform: 'scale(0.5, 0.5)' }),
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
                transform: 'scale(0.5, 0.5)'
            })
        )
    ])
]);
