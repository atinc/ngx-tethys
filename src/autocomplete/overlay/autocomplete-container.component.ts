import {
    Component,
    ComponentRef,
    ViewChild,
    EmbeddedViewRef,
    Inject,
    ElementRef,
    EventEmitter,
    HostListener,
    ChangeDetectorRef,
    OnInit,
    AfterViewInit,
    NgZone,
    TemplateRef
} from '@angular/core';
import { ComponentPortal, TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';

import { ThyAutocompleteConfig } from './autocomplete.config';
import { thyAutocompleteAnimations } from './autocomplete-animations';
import { ThyUpperOverlayContainer } from '../../core/overlay';
import { autocompleteUpperOverlayOptions } from './autocomplete.options';
import { Observable, fromEvent, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ThyClickDispatcher } from '../../core/event-dispatchers/click-dispatcher';

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
    }
})
export class ThyAutocompleteContainerComponent extends ThyUpperOverlayContainer implements AfterViewInit {
    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet;

    /** State of the autocomplete animation. */
    animationState: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    animationOpeningDone: Observable<AnimationEvent>;
    animationClosingDone: Observable<AnimationEvent>;

    beforeAttachPortal(): void {}

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThyAutocompleteConfig,
        changeDetectorRef: ChangeDetectorRef,
        private thyClickDispatcher: ThyClickDispatcher,
        private ngZone: NgZone
    ) {
        super(autocompleteUpperOverlayOptions, changeDetectorRef);

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
