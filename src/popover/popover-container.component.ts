import {
    Component,
    ComponentRef,
    ViewChild,
    EmbeddedViewRef,
    Inject,
    ElementRef,
    EventEmitter,
    HostListener
} from '@angular/core';
import { ComponentPortal, TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';

import { ThyPopoverConfig } from './popover.config';
import { thyPopoverAnimations } from './popover-animations';

export function throwThyPopoverContentAlreadyAttachedError() {
    throw Error('Attempting to attach popover content after content is already attached');
}

@Component({
    selector: 'thy-popover-container',
    templateUrl: './popover-container.component.html',
    animations: [thyPopoverAnimations.popoverContainer],
    host: {
        class: 'thy-popover-container',
        tabindex: '-1',
        '[attr.role]': `'popover'`,
        '[@popoverContainer]': 'animationState',
        '(@popoverContainer.start)': 'onAnimationStart($event)',
        '(@popoverContainer.done)': 'onAnimationDone($event)'
    }
})
export class ThyPopoverContainerComponent {
    @ViewChild(CdkPortalOutlet)
    private portalOutlet: CdkPortalOutlet;

    /** State of the popover animation. */
    animationState: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    insideClicked = new EventEmitter();

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThyPopoverConfig
    ) {}

    /**
     * Attach a ComponentPortal as content to this popover container.
     * @param portal Portal to be attached as the popover content.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this.portalOutlet.hasAttached()) {
            throwThyPopoverContentAlreadyAttachedError();
        }
        return this.portalOutlet.attachComponentPortal(portal);
    }

    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this.portalOutlet.hasAttached()) {
            throwThyPopoverContentAlreadyAttachedError();
        }
        return this.portalOutlet.attachTemplatePortal(portal);
    }

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
        // if (event.toState === 'void') {
        //     this.trapFocus();
        // } else if (event.toState === 'exit') {
        //     this.restoreFocus();
        // }
        this.animationStateChanged.emit(event);
    }

    /** Callback, invoked when an animation on the host starts. */
    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation(): void {
        this.animationState = 'exit';

        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        // this.changeDetectorRef.markForCheck();
    }

    @HostListener('click', [])
    onInsideClick() {
        if (this.config.insideClosable) {
            this.insideClicked.emit();
        }
    }
}
