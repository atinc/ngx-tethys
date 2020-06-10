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
    HostBinding,
    OnDestroy
} from '@angular/core';
import { ComponentPortal, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import { ThyDialogConfig } from './dialog.config';
import { thyDialogAnimations } from './dialog-animations';
import { ThyClickPositioner } from '../core';
import { FocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { ThyUpperOverlayContainer } from '../core/overlay';
import { dialogUpperOverlayOptions } from './dialog.options';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
export class ThyDialogContainerComponent extends ThyUpperOverlayContainer implements OnDestroy {
    animationOpeningDone: Observable<AnimationEvent>;
    animationClosingDone: Observable<AnimationEvent>;

    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet;

    @HostBinding(`attr.id`)
    id: string;

    /** State of the dialog animation. */
    animationState: 'void' | 'enter' | 'exit' = 'void';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    /** ID of the element that should be considered as the dialog's label. */
    ariaLabelledBy: string | null = null;

    /** Element that was focused before the dialog was opened. Save this to restore upon close. */
    private elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    /** The class that traps and manages focus within the dialog. */
    private focusTrap: FocusTrap;

    private savePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeDialogWasOpened = this.document.activeElement as HTMLElement;

            // Note that there is no focus method when rendering on the server.
            if (this.elementRef.nativeElement.focus) {
                // Move focus onto the dialog immediately in order to prevent the user from accidentally
                // opening multiple dialogs at the same time. Needs to be async, because the element
                // may not be focusable immediately.
                Promise.resolve().then(() => this.elementRef.nativeElement.focus());
            }
        }
    }

    /** Moves the focus inside the focus trap. */
    private trapFocus() {
        const element = this.elementRef.nativeElement;

        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(element);
        }

        // If we were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this.config.autoFocus) {
            this.focusTrap.focusInitialElementWhenReady();
        } else {
            const activeElement = this.document.activeElement;

            // Otherwise ensure that focus is on the dialog container. It's possible that a different
            // component tried to move focus while the open animation was running. See:
            // https://github.com/angular/components/issues/16215. Note that we only want to do this
            // if the focus isn't inside the dialog already, because it's possible that the consumer
            // turned off `autoFocus` in order to move focus themselves.
            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
    }

    private restoreFocus() {
        const toFocus = this.elementFocusedBeforeDialogWasOpened;

        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.config.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }

        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }

    private setTransformOrigin() {
        this.clickPositioner.runTaskUseLastPosition(lastPosition => {
            if (lastPosition) {
                const containerElement: HTMLElement = this.elementRef.nativeElement;
                const transformOrigin = `${lastPosition.x - containerElement.offsetLeft}px ${lastPosition.y -
                    containerElement.offsetTop}px 0px`;
                containerElement.style['transform-origin'] = transformOrigin;
                // 手动修改动画状态为从 void 到 enter, 开启动画
            }
            this.animationState = 'enter';
        });
    }

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThyDialogConfig,
        changeDetectorRef: ChangeDetectorRef,
        private clickPositioner: ThyClickPositioner,
        private focusTrapFactory: FocusTrapFactory
    ) {
        super(dialogUpperOverlayOptions, changeDetectorRef);
        this.animationOpeningDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'void';
            })
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'exit';
            })
        );
    }

    beforeAttachPortal(): void {
        this.setTransformOrigin();
        this.savePreviouslyFocusedElement();
    }

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
        if (event.toState === 'void') {
            this.trapFocus();
        } else if (event.toState === 'exit') {
            this.restoreFocus();
        }
        this.animationStateChanged.emit(event);
    }

    /** Callback, invoked when an animation on the host starts. */
    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    ngOnDestroy() {
        super.destroy();
    }
}
