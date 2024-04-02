import { ANIMATION_MODULE_TYPE, Directive, ElementRef, Inject, Input, NgZone, Optional, booleanAttribute } from '@angular/core';
import { take } from 'rxjs/operators';

/**
 * @internal
 */
@Directive({
    selector: 'thy-nav-ink-bar, [thyNavInkBar]',
    host: {
        class: 'thy-nav-ink-bar',
        '[class.thy-nav-ink-bar-animated]': 'animated'
    },
    standalone: true
})
export class ThyNavInkBarDirective {
    @Input({ transform: booleanAttribute }) isVertical: boolean;

    @Input({ transform: booleanAttribute }) showInkBar: boolean;

    get animated(): boolean {
        return this.animationMode !== 'NoopAnimations' && this.showInkBar;
    }
    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone,
        @Optional() @Inject(ANIMATION_MODULE_TYPE) public animationMode?: string
    ) {}

    public alignToElement(element: HTMLElement): void {
        this.show();
        this.ngZone.run(() => {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                this.setStyles(element);
            });
        });
    }

    private setStyles(element: HTMLElement): void {
        const inkBar: HTMLElement = this.elementRef.nativeElement;
        if (!this.isVertical) {
            inkBar.style.top = '';
            inkBar.style.bottom = '0px';
            inkBar.style.height = '2px';
            inkBar.style.left = this.getLeftPosition(element);
            inkBar.style.width = this.getElementWidth(element);
        } else {
            inkBar.style.left = '';
            inkBar.style.width = '2px';
            inkBar.style.top = this.getTopPosition(element);
            inkBar.style.height = this.getElementHeight(element);
        }
    }

    private getLeftPosition(element: HTMLElement): string {
        return element ? `${element.offsetLeft || 0}px` : '0';
    }

    private getElementWidth(element: HTMLElement): string {
        return element ? `${element.offsetWidth || 0}px` : '0';
    }

    private getTopPosition(element: HTMLElement): string {
        return element ? `${element.offsetTop || 0}px` : '0';
    }

    private getElementHeight(element: HTMLElement): string {
        return element ? `${element.offsetHeight || 0}px` : '0';
    }

    private show() {
        this.elementRef.nativeElement.style.visibility = 'visible';
    }

    public hide() {
        this.elementRef.nativeElement.style.visibility = 'hidden';
    }
}
