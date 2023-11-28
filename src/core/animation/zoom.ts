import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animation-consts';

export const zoomMotion: AnimationTriggerMetadata = trigger('zoomMotion', [
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
