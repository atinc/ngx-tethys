import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    HostBinding,
    ElementRef,
    TemplateRef,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AnimationEvent } from '@angular/animations';

import { ThyTooltipVisibility } from './interface';
import { thyTooltipAnimations } from './tooltip-animations';
import { UpdateHostClassService } from '../shared';
import { coerceArray } from '../util/helpers';
import { OverlayRef } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
    selector: 'thy-tooltip',
    templateUrl: './tooltip.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [thyTooltipAnimations.tooltipState],
    host: {
        '[@state]': 'visibility',
        '(@state.start)': 'animationStart()',
        '(@state.done)': 'animationDone($event)'
    },
    providers: [UpdateHostClassService]
})
export class ThyTooltipComponent implements OnInit, OnDestroy {
    @HostBinding(`class.thy-tooltip`) addTooltipContainerClass = true;

    _content: string | TemplateRef<HTMLElement>;

    data: any;

    _placement: string;

    private readonly onHide: Subject<void> = new Subject();

    private closeOnInteraction = false;

    visibility: ThyTooltipVisibility = 'initial';

    showTimeoutId: number | null | any;

    hideTimeoutId: number | null | any;

    tooltipClasses: string[] = [];

    isTemplateRef = false;

    private manualListeners = new Map<string, EventListenerOrEventListenerObject>();
    private overlayRef: OverlayRef;
    private tooltipInstance: ThyTooltipComponent;

    get placement() {
        return this._placement;
    }

    set placement(value: string) {
        this._placement = value;
        this.updateClasses();
    }

    get content() {
        return this._content;
    }

    set content(value: string | TemplateRef<HTMLElement>) {
        this._content = value;
        this.isTemplateRef = value instanceof TemplateRef;
    }

    private updateClasses() {
        let classes: string[] = [];
        if (this.placement) {
            classes.push(`thy-tooltip-${this.placement}`);
        }

        if (this.tooltipClasses) {
            classes = classes.concat(this.tooltipClasses);
        }

        this.updateHostClassService.updateClass(classes);
    }

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef<HTMLElement>,
        private focusMonitor: FocusMonitor
    ) {
        this.updateHostClassService.initializeElement(elementRef);
    }

    ngOnInit() {}

    markForCheck(): void {
        this.changeDetectorRef.markForCheck();
    }

    isVisible() {
        return this.visibility === 'visible';
    }

    show(delay: number): void {
        // Cancel the delayed hide if it is scheduled
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
            this.hideTimeoutId = null;
        }

        // Body interactions should cancel the tooltip if there is a delay in showing.
        this.closeOnInteraction = true;
        this.showTimeoutId = setTimeout(() => {
            this.visibility = 'visible';
            this.showTimeoutId = null;
            this.markForCheck();
        }, delay);
    }

    hide(delay: number): void {
        // Cancel the delayed show if it is scheduled
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
            this.showTimeoutId = null;
        }

        this.hideTimeoutId = setTimeout(() => {
            this.visibility = 'hidden';
            this.hideTimeoutId = null;
            this.markForCheck();
        }, delay);
    }

    animationStart() {
        this.closeOnInteraction = false;
    }

    animationDone(event: AnimationEvent): void {
        const toState = event.toState as ThyTooltipVisibility;
        if (toState === 'hidden' && !this.isVisible()) {
            this.onHide.next();
        }
        if (toState === 'visible' || toState === 'hidden') {
            this.closeOnInteraction = true;
        }
    }

    afterHidden(): Observable<void> {
        return this.onHide.asObservable();
    }

    setTooltipClass(classes: string | string[]) {
        this.tooltipClasses = coerceArray(classes);
        this.updateClasses();
        // this.markForCheck();
    }

    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.tooltipInstance = null;
        }

        this.manualListeners.forEach((listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
