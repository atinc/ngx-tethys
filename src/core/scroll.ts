import { Injectable, NgZone, inject, DOCUMENT } from '@angular/core';
import { reqAnimFrame } from './request-animation';

export type EasyingFn = (t: number, b: number, c: number, d: number) => number;

function easeInOutCubic(t: number, b: number, c: number, d: number): number {
    const cc = c - b;
    let tt = t / (d / 2);
    if (tt < 1) {
        return (cc / 2) * tt * tt * tt + b;
    } else {
        return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ThyScrollService {
    private ngZone = inject(NgZone);

    private document: Document;

    constructor() {
        const document = inject(DOCUMENT);

        this.document = document;
    }

    /** Set the position of the scroll bar of `element`. */
    setScrollTop(element: Element | Window, topValue: number = 0): void {
        if (element === window) {
            this.document.body.scrollTop = topValue;
            this.document.documentElement.scrollTop = topValue;
        } else {
            (element as Element).scrollTop = topValue;
        }
    }

    /** Get the position of the scoll bar of `element`. */
    getScroll(element?: Element | Window, top: boolean = true): number {
        const target = element ? element : window;
        const prop = top ? 'pageYOffset' : 'pageXOffset';
        const method = top ? 'scrollTop' : 'scrollLeft';
        const isWindow = target === window;
        // @ts-ignore
        let ret = isWindow ? target[prop] : target[method];
        if (isWindow && typeof ret !== 'number') {
            ret = this.document.documentElement[method];
        }
        return ret;
    }

    /**
     * Scroll `element` to some position with animation.
     *
     * @param container container, `window` by default
     * @param topValue Scroll to `top`, 0 by default
     * @param easing Transition curve, `easeInOutCubic` by default
     * @param callback callback invoked when transition is done
     */
    scrollTo(container: Element | Window, topValue: number = 0, easing?: EasyingFn, callback?: () => void): void {
        const target = container ? container : window;
        const scrollTop = this.getScroll(target);
        const startTime = Date.now();
        const frameFunc = () => {
            const timestamp = Date.now();
            const time = timestamp - startTime;
            this.setScrollTop(target, (easing || easeInOutCubic)(time, scrollTop, topValue, 450));
            if (time < 450) {
                this.ngZone.runOutsideAngular(() => reqAnimFrame(frameFunc));
            } else {
                if (callback) {
                    // The `frameFunc` is called within the `<root>` zone, but we have to re-enter
                    // the Angular zone when calling custom callback to be backwards-compatible.
                    this.ngZone.run(() => callback());
                }
            }
        };
        // The `requestAnimationFrame` triggers change detection, but setting
        // `document.scrollTop` doesn't require Angular to run `ApplicationRef.tick()`.
        this.ngZone.runOutsideAngular(() => reqAnimFrame(frameFunc));
    }
}
