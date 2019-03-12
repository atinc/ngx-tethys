import {
    Component,
    ChangeDetectionStrategy,
    ComponentRef,
    ViewChild,
    EmbeddedViewRef,
    ElementRef,
    Inject,
    EventEmitter,
    ChangeDetectorRef,
    HostBinding
} from '@angular/core';
import {
    ComponentPortal,
    CdkPortalOutlet,
    TemplatePortal
} from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import { ThyDialogConfig } from './dialog.config';
import { thyDialogAnimations } from './dialog-animations';
import { ThyClickPositioner } from '../core';

@Component({
    selector: 'thy-dialog-container',
    template: `
        <ng-template cdkPortalOutlet></ng-template>
    `,
    // Using OnPush for dialogs caused some sync issues, e.g. custom ngModel can't to detect changes
    // Disabled until we can track them down.
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [thyDialogAnimations.dialogContainer],
    host: {
        class: 'thy-dialog-container',
        tabindex: '-1',
        'aria-modal': 'true',
        '[attr.id]': 'id',
        '[attr.role]': 'config.role',
        '[attr.aria-labelledby]': 'config.ariaLabel ? null : ariaLabelledBy',
        '[attr.aria-label]': 'config.ariaLabel',
        '[attr.aria-describedby]': 'config.ariaDescribedBy || null',
        '[@dialogContainer]': 'animationState',
        '(@dialogContainer.start)': 'onAnimationStart($event)',
        '(@dialogContainer.done)': 'onAnimationDone($event)'
    }
})
export class ThyDialogContainerComponent {
    @ViewChild(CdkPortalOutlet)
    private portalOutlet: CdkPortalOutlet;

    @HostBinding(`attr.id`)
    id: string;

    /** State of the dialog animation. */
    animationState: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    /** ID of the element that should be considered as the dialog's label. */
    ariaLabelledBy: string | null = null;

    /** Element that was focused before the dialog was opened. Save this to restore upon close. */
    private elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    private savePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeDialogWasOpened = this.document
                .activeElement as HTMLElement;

            // Note that there is no focus method when rendering on the server.
            if (this.elementRef.nativeElement.focus) {
                // Move focus onto the dialog immediately in order to prevent the user from accidentally
                // opening multiple dialogs at the same time. Needs to be async, because the element
                // may not be focusable immediately.
                Promise.resolve().then(() =>
                    this.elementRef.nativeElement.focus()
                );
            }
        }
    }

    private restoreFocus() {
        const toFocus = this.elementFocusedBeforeDialogWasOpened;

        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (
            this.config.restoreFocus &&
            toFocus &&
            typeof toFocus.focus === 'function'
        ) {
            toFocus.focus();
        }

        // if (this._focusTrap) {
        //   this._focusTrap.destroy();
        // }
    }

    private setTransformOrigin() {
        this.clickPositioner.runTaskUseLastPosition(lastPosition => {
            if (lastPosition) {
                const containerElement: HTMLElement = this.elementRef
                    .nativeElement;
                const transformOrigin = `${lastPosition.x -
                    containerElement.offsetLeft}px ${lastPosition.y -
                    containerElement.offsetTop}px 0px`;
                containerElement.style['transform-origin'] = transformOrigin;
            }
        });
    }

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThyDialogConfig,
        private changeDetectorRef: ChangeDetectorRef,
        private clickPositioner: ThyClickPositioner
    ) {}

    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this.portalOutlet.hasAttached()) {
            throwThyDialogContentAlreadyAttachedError();
        }

        this.setTransformOrigin();
        this.savePreviouslyFocusedElement();
        return this.portalOutlet.attachComponentPortal(portal);
    }

    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this.portalOutlet.hasAttached()) {
            throwThyDialogContentAlreadyAttachedError();
        }

        this.setTransformOrigin();
        this.savePreviouslyFocusedElement();
        return this.portalOutlet.attachTemplatePortal(portal);
    }

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
        if (event.toState === 'enter') {
            // this._trapFocus();
        } else if (event.toState === 'exit') {
            this.restoreFocus();
        }

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
        this.changeDetectorRef.markForCheck();
    }
}

export function throwThyDialogContentAlreadyAttachedError() {
    throw Error(
        'Attempting to attach dialog content after content is already attached'
    );
}
