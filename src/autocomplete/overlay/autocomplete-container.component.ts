import { ThyAbstractOverlayContainer, ThyClickDispatcher, ThyPortalOutlet } from 'ngx-tethys/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AnimationEvent } from '@angular/animations';
import { PortalModule } from '@angular/cdk/portal';

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone, ViewChild, inject, DOCUMENT } from '@angular/core';

import { thyAutocompleteAnimations } from './autocomplete-animations';
import { ThyAutocompleteConfig } from './autocomplete.config';
import { autocompleteAbstractOverlayOptions } from './autocomplete.options';

/**
 * @private
 */
@Component({
    selector: 'thy-autocomplete-container',
    templateUrl: './autocomplete-container.component.html',
    animations: [thyAutocompleteAnimations.autocompleteContainer],
    host: {
        class: 'thy-autocomplete-container',
        tabindex: '-1',
        '[attr.role]': `'autocomplete'`,
        '[@autocompleteContainer]': 'animationState',
        '(@autocompleteContainer.start)': 'onAnimationStart($event)',
        '(@autocompleteContainer.done)': 'onAnimationDone($event)'
    },
    imports: [PortalModule, ThyPortalOutlet]
})
export class ThyAutocompleteContainer extends ThyAbstractOverlayContainer implements AfterViewInit {
    private elementRef = inject(ElementRef);
    private document = inject(DOCUMENT);
    config = inject(ThyAutocompleteConfig);
    private thyClickDispatcher = inject(ThyClickDispatcher);
    private ngZone = inject(NgZone);

    @ViewChild(ThyPortalOutlet, { static: true })
    portalOutlet!: ThyPortalOutlet;

    /** State of the autocomplete animation. */
    animationState: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    animationOpeningDone!: Observable<AnimationEvent>;
    animationClosingDone!: Observable<AnimationEvent>;

    beforeAttachPortal(): void {}

    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);

        super(autocompleteAbstractOverlayOptions, changeDetectorRef);

        this.animationOpeningDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'enter';
            })
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'exit';
            })
        );
    }

    ngAfterViewInit() {}

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    /** Callback, invoked when an animation on the host starts. */
    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation(): void {
        this.animationState = 'exit';
        this.changeDetectorRef.markForCheck();
    }
}
