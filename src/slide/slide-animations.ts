import { state, transition, style, animate, AnimationTriggerMetadata, trigger } from '@angular/animations';

const animationBody = [
    state('left right top bottom', style({ transform: '*' })),
    state('exit', style({ transform: 'translate(100%)' })),
    transition('void => left', [style({ transform: 'translateX(-100%)' }), animate('0.2s ease-in')]),
    transition('left => exit', [animate('0.2s', style({ transform: 'translateX(-100%)' }))]),
    transition('void => right', [style({ transform: 'translateX(100%)' }), animate('0.2s ease-in')]),
    transition('right => exit', [style({ transform: 'translateX(100%)' }), animate('0.2s ease-out')]),
    transition('void => top', [style({ transform: 'translateY(-100%)' }), animate('0.2s ease-in')]),
    transition('top => exit', [animate('0.2s', style({ transform: 'translateY(-100%)' }))]),
    transition('void => bottom', [style({ transform: 'translateY(100%)' }), animate('0.2s ease-in')]),
    transition('bottom => exit', [animate('0.2s', style({ transform: 'translateY(100%)' }))])
];

export const thySlideAnimations: {
    readonly slideContainer: AnimationTriggerMetadata;
} = {
    slideContainer: trigger('slideContainer', animationBody)
};
