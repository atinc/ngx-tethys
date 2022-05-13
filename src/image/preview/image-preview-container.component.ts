import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    NgZone,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { ThyImageInfo, ThyImagePreviewOptions } from '../image.interface';
import { filter } from 'rxjs/operators';
import { reqAnimFrame, ThyAbstractOverlayContainer, ThyClickPositioner } from 'ngx-tethys/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { imageAbstractOverlayOptions, ThyImagePreviewConfig } from '../image-config';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import { thyImagePreviewAnimations } from './image-preview-animations';

@Component({
    selector: 'thy-image-preview-container',
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [thyImagePreviewAnimations.imagePreviewContainer],
    template: `
        <ng-template cdkPortalOutlet></ng-template>
    `,
    host: {
        class: 'thy-image-preview-container',
        tabindex: '-1',
        'aria-modal': 'true',
        '[attr.id]': 'id',
        '[attr.role]': 'config.role',
        '[attr.aria-labelledby]': 'config.ariaLabel ? null : ariaLabelledBy',
        '[attr.aria-label]': 'config.ariaLabel',
        '[attr.aria-describedby]': 'config.ariaDescribedBy || null',
        '[@imagePreviewContainer]': 'animationState',
        '(@imagePreviewContainer.start)': 'onAnimationStart($event)',
        '(@imagePreviewContainer.done)': 'onAnimationDone($event)'
    }
})
export class ThyImagePreviewContainerComponent extends ThyAbstractOverlayContainer implements OnDestroy {
    images: ThyImageInfo[] = [];
    previewConfig: ThyImagePreviewOptions;
    containerClick = new EventEmitter<void>();
    animationOpeningDone: Observable<AnimationEvent>;
    animationClosingDone: Observable<AnimationEvent>;

    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet;

    @HostBinding(`attr.id`)
    id: string;

    /** State of the image preview animation. */
    animationState: 'void' | 'enter' | 'exit' = 'void';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    /** ID of the element that should be considered as the image preview's label. */
    ariaLabelledBy: string | null = null;

    /** Element that was focused before the image preview was opened. Save this to restore upon close. */
    private elementFocusedBeforeImagePreviewWasOpened: HTMLElement | null = null;

    /** The class that traps and manages focus within the  image preview. */
    private focusTrap: FocusTrap;

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        public config: ThyImagePreviewConfig,
        private cdr: ChangeDetectorRef,
        private clickPositioner: ThyClickPositioner,
        @Inject(DOCUMENT) private document: any,
        private focusTrapFactory: FocusTrapFactory,
        public changeDetectorRef: ChangeDetectorRef
    ) {
        super(imageAbstractOverlayOptions, changeDetectorRef);
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

    private savePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeImagePreviewWasOpened = this.document.activeElement as HTMLElement;

            // Note that there is no focus method when rendering on the server.
            if (this.elementRef.nativeElement.focus) {
                // Note: this is being run outside of the Angular zone because `element.focus()` doesn't require
                // running change detection.
                this.ngZone.runOutsideAngular(() =>
                    // Move focus onto the image preview immediately in order to prevent the user from accidentally
                    // opening multiple image previews at the same time. Needs to be async, because the element
                    // may not be focusable immediately.

                    // Note: `element.focus()` causes re-layout and this may lead to frame drop on slower devices.
                    // https://gist.github.com/paulirish/5d52fb081b3570c81e3a#setting-focus
                    // `setTimeout` is a macrotask and macrotasks are executed within the current rendering frame.
                    // Animation tasks are executed within the next rendering frame.
                    reqAnimFrame(() => this.elementRef.nativeElement.focus())
                );
            }
        }
    }

    setImages(images: ThyImageInfo[]): void {
        this.images = images;
        this.cdr.markForCheck();
    }

    /** Moves the focus inside the focus trap. */
    private trapFocus() {
        const element = this.elementRef.nativeElement;

        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(element);
        }

        // If we were to attempt to focus immediately, then the content of the image preview would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this.config.autoFocus) {
            this.focusTrap.focusInitialElementWhenReady();
        } else {
            const activeElement = this.document.activeElement;

            // Otherwise ensure that focus is on the image preview container. It's possible that a different
            // component tried to move focus while the open animation was running. See:
            // https://github.com/angular/components/issues/16215. Note that we only want to do this
            // if the focus isn't inside the image preview already, because it's possible that the consumer
            // turned off `autoFocus` in order to move focus themselves.
            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
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

    private restoreFocus() {
        const toFocus = this.elementFocusedBeforeImagePreviewWasOpened;

        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.config.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }

        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
    ngOnDestroy() {
        super.destroy();
    }
}
