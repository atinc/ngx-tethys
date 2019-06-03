import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';

// 'cubic-bezier(0, 0, 0.2, 1)';
// cubic-bezier(.17, .86, .73, .14)
const CUBIC_BEZIER = 'cubic-bezier(0.08, 0.82, 0.17, 1)';

/**
 * Animations used by ThyTooltip.
 * @docs-private
 */
export const thyTooltipAnimations: {
    readonly tooltipState: AnimationTriggerMetadata;
} = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: trigger('state', [
        state('initial, void, hidden', style({ opacity: 0, transform: 'scale(0)' })),
        state('visible', style({ transform: 'scale(1)' })),
        transition(
            '* => visible',
            animate(
                `200ms ${CUBIC_BEZIER}`,
                keyframes([
                    style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
                    style({ opacity: 0.5, transform: 'scale(0.99)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'scale(1)', offset: 1 })
                ])
            )
        ),
        transition('* => hidden', animate(`100ms ${CUBIC_BEZIER}`, style({ opacity: 0 })))
    ])
};
