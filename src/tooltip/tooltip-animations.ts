import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from 'ngx-tethys/core';

export const thyTooltipAnimations: {
    readonly tooltipState: AnimationTriggerMetadata;
} = {
    tooltipState: trigger('state', [
        state('initial, void, hidden', style({ opacity: 0, transform: 'scale(0)' })),
        state('visible', style({ transform: 'scale(1)' })),

        transition('* => visible', [
            style({ opacity: 0, transform: 'scale(0.9, 0.9)' }),
            animate(
                `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
                style({
                    opacity: 1,
                    transform: 'scale(1, 1)'
                })
            )
        ]),
        transition('visible => *', [
            style({ opacity: 1, transform: 'scale(1, 1)' }),
            animate(
                `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_STANDARD}`,
                style({
                    opacity: 0,
                    transform: 'scale(0.9, 0.9)'
                })
            )
        ])
    ])
};
