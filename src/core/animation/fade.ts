import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { AnimationDuration } from './animation-consts';

export const thyAnimationFade = {
    enter: 'thy-fade-enter',
    leave: 'thy-fade-leave'
};

/**
 * @deprecated Please use the new Angular animate.enter and animate.leave APIs.
 * @see https://angular.dev/guide/animations
 */
export const fadeMotion: AnimationTriggerMetadata = trigger('fadeMotion', [
    transition(':enter', [style({ opacity: 0 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 0 }))])
]);
