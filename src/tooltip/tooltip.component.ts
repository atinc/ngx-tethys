import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    HostBinding,
    TemplateRef,
    OnInit,
    inject,
    signal,
    HostListener
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyTooltipVisibility } from './interface';
import { coerceArray } from 'ngx-tethys/util';
import { NgTemplateOutlet } from '@angular/common';

/**
 * @internal
 */
@Component({
    selector: 'thy-tooltip',
    templateUrl: './tooltip.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.thy-scale-enter]': 'this.visibility() === "visible"',
        '[class.thy-scale-leave]': 'this.visibility() === "hidden"'
    },
    imports: [NgTemplateOutlet]
})
export class ThyTooltip implements OnInit {
    private changeDetectorRef = inject(ChangeDetectorRef);

    @HostBinding(`class.thy-tooltip`) addTooltipContainerClass = true;

    _content!: string | TemplateRef<HTMLElement>;

    data!: any;

    private readonly onHide = new Subject<void>();

    private hostRenderer = useHostRenderer();

    visibility = signal<ThyTooltipVisibility>('initial');

    showTimeoutId!: number | null | any;

    hideTimeoutId!: number | null | any;

    tooltipClasses: string[] = [];

    isTemplateRef = false;

    get content() {
        return this._content;
    }

    set content(value: string | TemplateRef<HTMLElement>) {
        this._content = value;
        this.isTemplateRef = value instanceof TemplateRef;
    }

    private updateClasses() {
        let classes: string[] = [];

        if (this.tooltipClasses) {
            classes = classes.concat(this.tooltipClasses);
        }

        this.hostRenderer.updateClass(classes);
    }

    ngOnInit() {}

    markForCheck(): void {
        this.changeDetectorRef.markForCheck();
    }

    isVisible() {
        return this.visibility() === 'visible';
    }

    show(delay: number): void {
        // Cancel the delayed hide if it is scheduled
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
            this.hideTimeoutId = null;
        }

        // Body interactions should cancel the tooltip if there is a delay in showing.
        this.showTimeoutId = setTimeout(() => {
            this.visibility.set('visible');
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
            this.visibility.set('hidden');
            this.hideTimeoutId = null;
            this.markForCheck();
        }, delay);
    }

    @HostListener('transitionend', ['$event'])
    onTransitionEnd(event: TransitionEvent): void {
        if (event.propertyName === 'opacity' || event.propertyName === 'transform') {
            if (this.visibility() === 'hidden') {
                this.onHide.next();
            }
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
}
