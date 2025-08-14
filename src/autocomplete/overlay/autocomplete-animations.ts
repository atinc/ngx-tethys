import { state, style, trigger, AnimationTriggerMetadata } from '@angular/animations';

const animationBody = [state('void, exit', style({ opacity: 0, transform: 'scale(0.1)' })), state('enter', style({ transform: 'none' }))];

/**
 * Animations used by ThyAutocomplete.
 * @docs-private
 */
export const thyAutocompleteAnimations: {
    readonly autocompleteContainer: AnimationTriggerMetadata;
} = {
    autocompleteContainer: trigger('autocompleteContainer', animationBody)
};
