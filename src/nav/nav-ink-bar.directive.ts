import { ANIMATION_MODULE_TYPE, Directive, ElementRef, computed, inject, input } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @internal
 */
@Directive({
    selector: 'thy-nav-ink-bar, [thyNavInkBar]',
    host: {
        class: 'thy-nav-ink-bar',
        '[class.thy-nav-ink-bar-animated]': 'animated()'
    }
})
export class ThyNavInkBarDirective {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    animationMode? = inject(ANIMATION_MODULE_TYPE, { optional: true });

    readonly isVertical = input(false, { transform: coerceBooleanProperty });

    readonly showInkBar = input(false, { transform: coerceBooleanProperty });

    readonly animated = computed(() => this.animationMode !== 'NoopAnimations' && this.showInkBar());

    public alignToElement(element: HTMLElement): void {
        this.show();

        this.setStyles(element);
    }
    private setStyles(element: HTMLElement): void {
        const inkBar: HTMLElement = this.elementRef.nativeElement;
        if (!this.isVertical()) {
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
