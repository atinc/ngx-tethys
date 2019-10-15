import { transition, style, animate, AnimationTriggerMetadata, trigger, state } from '@angular/animations';

const animationBody = [
    transition('void => offsetLeft', [style({ width: 0 }), animate('0.2s ease-in')]),
    transition('offsetLeft => exit', [animate('0.2s', style({ width: 0 }))]),
    transition('void => offsetRight', [style({ width: 0 }), animate('0.2s ease')]),
    transition('offsetRight => exit', [animate('0.2s', style({ width: 0 }))]),
    transition('void => offsetTop', [style({ height: 0 }), animate('0.2s ease-in')]),
    transition('offsetTop => exit', [animate('0.2s', style({ height: 0 }))]),
    transition('void => offsetBottom', [style({ height: 0 }), animate('0.2s ease-in')]),
    transition('offsetBottom => exit', [animate('0.2s', style({ height: 0 }))]),

    state('left right top bottom', style({ transform: '*' })),
    transition('void => left', [style({ transform: 'translateX(-100%)' }), animate('0.2s ease-in')]),
    transition('left => exit', [animate('0.2s', style({ transform: 'translateX(-100%)' }))]),
    transition('void => right', [style({ transform: 'translateX(100%)' }), animate('0.2s ease-in')]),
    transition('right => exit', [animate('0.2s', style({ transform: 'translateX(100%)' }))]),
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
