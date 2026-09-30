import { reqAnimFrame, ThyAbstractOverlayContainer, ThyClickPositioner, ThyPortalOutlet } from 'ngx-tethys/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AnimationEvent } from '@angular/animations';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { ComponentPortal, PortalModule, TemplatePortal } from '@angular/cdk/portal';

import {
    ANIMATION_MODULE_TYPE,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    DOCUMENT,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    inject,
    NgZone,
    OnDestroy,
    Renderer2,
    ViewChild
} from '@angular/core';

import { THY_DIALOG_ZOOM_ANIMATION_NAME, THY_DIALOG_ZOOM_CLASS_NAME_MAP } from './dialog-animation.config';
import { ThyDialogConfig } from './dialog.config';
import { dialogAbstractOverlayOptions } from './dialog.options';
import { ThyDialogHeader } from './header/dialog-header.component';

/**
 * @private
 */
@Component({
    selector: 'thy-dialog-container',
    template: `
        @if (config.header?.title) {
            <thy-dialog-header
                [thyTitle]="$safeNavigationMigration(config.header?.title)"
                [thyIcon]="$safeNavigationMigration(config.header?.icon)"></thy-dialog-header>
        }
        <ng-template thyPortalOutlet></ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        class: 'thy-dialog-container',
        tabindex: '-1',
        'aria-modal': 'true',
        '[attr.id]': 'id',
        '[attr.role]': 'config.role',
        '[attr.aria-labelledby]': 'config.ariaLabel ? null : ariaLabelledBy',
        '[attr.aria-label]': 'config.ariaLabel',
        '[attr.aria-describedby]': 'config.ariaDescribedBy || null'
    },
    imports: [PortalModule, ThyPortalOutlet, forwardRef(() => ThyDialogHeader)]
})
export class ThyDialogContainer extends ThyAbstractOverlayContainer implements OnDestroy {
    private elementRef = inject(ElementRef<HTMLElement>);
    private document = inject(DOCUMENT);
    config = inject(ThyDialogConfig);
    private clickPositioner = inject(ThyClickPositioner);
    private focusTrapFactory = inject(FocusTrapFactory);
    private ngZone = inject(NgZone);
    private renderer = inject(Renderer2);
    private readonly animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });

    animationOpeningDone!: Observable<AnimationEvent>;
    animationClosingDone!: Observable<AnimationEvent>;

    @ViewChild(ThyPortalOutlet, { static: true })
    portalOutlet!: ThyPortalOutlet;

    @HostBinding(`attr.id`)
    id!: string;

    animationState: 'void' | 'enter' | 'exit' = 'void';

    animationStateChanged = new EventEmitter<AnimationEvent>();

    ariaLabelledBy: string | null = null;

    private elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    private focusTrap!: FocusTrap;

    private destroyed = false;

    private savePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeDialogWasOpened = this.document.activeElement as HTMLElement;

            if (this.elementRef.nativeElement.focus) {
                this.ngZone.runOutsideAngular(() =>
                    reqAnimFrame(() => this.elementRef.nativeElement.focus())
                );
            }
        }
    }

    private trapFocus() {
        if (this.destroyed) {
            return;
        }

        const element = this.elementRef.nativeElement;

        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(element);
        }

        if (this.config.autoFocus) {
            this.focusTrap.focusInitialElementWhenReady();
        } else {
            const activeElement = this.document.activeElement;

            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
    }

    private restoreFocus() {
        const toFocus = this.elementFocusedBeforeDialogWasOpened;

        if (this.config.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus(this.config.restoreFocusOptions);
        }

        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }

    private animationDisabled(): boolean {
        return !dialogAbstractOverlayOptions.animationEnabled || this.animationType === 'NoopAnimations';
    }

    private emitAnimationPhase(phaseName: 'start' | 'done', toState: 'enter' | 'exit' | 'void') {
        this.animationStateChanged.emit({
            phaseName,
            toState,
            fromState: 'void',
            totalTime: 0
        } as AnimationEvent);
    }

    /** Legacy `@angular/animations` used `toState === 'void'` when enter finished under noop animations. */
    private onEnterAnimationComplete(): void {
        this.cleanAnimationClasses();
        this.animationState = 'enter';
        this.changeDetectorRef.markForCheck();
        this.onAnimationDone({ phaseName: 'done', toState: 'void' });
    }

    private scheduleEnterAnimation(): void {
        this.clickPositioner.runTaskUseLastPosition(lastPosition => {
            if (lastPosition) {
                const containerElement = this.elementRef.nativeElement;
                containerElement.style.transformOrigin = `${lastPosition.x - containerElement.offsetLeft}px ${
                    lastPosition.y - containerElement.offsetTop
                }px 0px`;
            }
            this.startEnterAnimation();
            this.changeDetectorRef.markForCheck();
        });
    }

    private setEnterInitialClass(): void {
        this.elementRef.nativeElement.classList.add(THY_DIALOG_ZOOM_CLASS_NAME_MAP.enter);
    }

    private setEnterActiveClass(): void {
        this.elementRef.nativeElement.classList.add(THY_DIALOG_ZOOM_CLASS_NAME_MAP.enterActive);
    }

    private setLeaveAnimationClasses(): void {
        const map = THY_DIALOG_ZOOM_CLASS_NAME_MAP;
        this.elementRef.nativeElement.classList.add(map.leave, map.leaveActive);
    }

    private cleanAnimationClasses(): void {
        const element = this.elementRef.nativeElement;
        const map = THY_DIALOG_ZOOM_CLASS_NAME_MAP;
        element.classList.remove(map.enter, map.enterActive, map.leave, map.leaveActive);
    }

    private startEnterAnimation(): void {
        this.emitAnimationPhase('start', 'enter');

        if (this.animationDisabled()) {
            this.onEnterAnimationComplete();
            return;
        }

        this.setEnterInitialClass();
        reqAnimFrame(() => this.setEnterActiveClass());

        const element = this.elementRef.nativeElement;
        const onAnimationEnd = (event: globalThis.AnimationEvent): void => {
            if (event.target !== element || event.animationName !== THY_DIALOG_ZOOM_ANIMATION_NAME.enter) {
                return;
            }
            element.removeEventListener('animationend', onAnimationEnd);
            this.onEnterAnimationComplete();
        };
        element.addEventListener('animationend', onAnimationEnd);
    }

    private startLeaveAnimation(): void {
        if (this.animationDisabled()) {
            this.restoreFocus();
            this.emitAnimationPhase('done', 'exit');
            return;
        }

        this.setLeaveAnimationClasses();
        const element = this.elementRef.nativeElement;
        const onAnimationEnd = (event: globalThis.AnimationEvent): void => {
            if (event.target !== element || event.animationName !== THY_DIALOG_ZOOM_ANIMATION_NAME.leave) {
                return;
            }
            element.removeEventListener('animationend', onAnimationEnd);
            this.cleanAnimationClasses();
            this.restoreFocus();
            this.emitAnimationPhase('done', 'exit');
        };
        element.addEventListener('animationend', onAnimationEnd);
    }

    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);

        super(dialogAbstractOverlayOptions, changeDetectorRef);
        this.animationOpeningDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => event.phaseName === 'done' && event.toState === 'void')
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => event.phaseName === 'done' && event.toState === 'exit')
        );
        this.animationStateChanged
            .pipe(filter((event: AnimationEvent) => event.phaseName === 'start' && event.toState === 'exit'))
            .subscribe(() => {
                this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', 'none');
            });
    }

    beforeAttachPortal(): void {
        this.savePreviouslyFocusedElement();
    }

    override attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        const ref = super.attachComponentPortal(portal);
        this.scheduleEnterAnimation();
        return ref;
    }

    override attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        const ref = super.attachTemplatePortal(portal);
        this.scheduleEnterAnimation();
        return ref;
    }

    override startExitAnimation(): void {
        this.animationState = 'exit';
        this.beforeDetachPortal();
        this.emitAnimationPhase('start', 'exit');
        this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', 'none');
        this.startLeaveAnimation();
        this.changeDetectorRef.markForCheck();
    }

    /** @docs-private Used by unit tests to simulate animation callbacks. */
    onAnimationStart(event: Pick<AnimationEvent, 'phaseName' | 'toState'>): void {
        if (event.phaseName === 'start' && event.toState === 'exit') {
            this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', 'none');
        }
        this.animationStateChanged.emit(event as AnimationEvent);
    }

    /** @docs-private Used by unit tests to simulate animation callbacks. */
    onAnimationDone(event: Pick<AnimationEvent, 'phaseName' | 'toState'>): void {
        if (event.toState === 'void') {
            this.trapFocus();
        } else if (event.toState === 'exit') {
            this.restoreFocus();
        }
        this.animationStateChanged.emit(event as AnimationEvent);
    }

    ngOnDestroy() {
        this.destroyed = true;
        this.focusTrap?.destroy();
        super.destroy();
    }
}
