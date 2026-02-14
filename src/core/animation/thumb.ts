import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves } from './animation-consts';

export interface ThumbAnimationProps {
    transform: number;
    width: number;
}

/**
 * @deprecated Please use the new Angular animate.enter and animate.leave APIs.
 * @see https://angular.dev/guide/animations
 */
export const thumbMotion: AnimationTriggerMetadata = trigger('thumbMotion', [
    state('from', style({ transform: 'translateX({{ transform }}px)', width: '{{ width }}px' }), {
        params: { transform: 0, width: 0 }
    }),

    state('to', style({ transform: 'translateX({{ transform }}px)', width: '{{ width }}px' }), {
        params: { transform: 100, width: 0 }
    }),

    transition('from => to', animate(`300ms ${AnimationCurves.EASE_IN_OUT}`))
]);
