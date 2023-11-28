import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animation-consts';

export const slideMotion: AnimationTriggerMetadata = trigger('slideMotion', [
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
