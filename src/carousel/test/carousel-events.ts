import { ThyCarouselComponent } from 'ngx-tethys/carousel';
import { dispatchEvent, dispatchMouseEvent, dispatchTouchEvent } from 'ngx-tethys/testing';
import { ComponentFixture, tick } from '@angular/core/testing';

export function mouseSwipe(carousel: ThyCarouselComponent, distance: number, delay = 0, fixture?: any): void {
    carousel.onDrag(
        new MouseEvent('mousedown', {
            clientX: 500,
            clientY: 0
        })
    );
    dispatchMouseEvent(document, 'mousemove', 500 - distance, 0);
    if (delay) {
        tick(delay);
        fixture.detectChanges();
    }
    dispatchMouseEvent(document, 'mouseup');
}

export function touchSwipe(carousel: ThyCarouselComponent, target: HTMLElement, distance: number, delay = 0, fixture?: any): void {
    const touchObj = new Touch({
        clientX: 500,
        clientY: 0,
        pageX: 500,
        identifier: Date.now(),
        target: target
    });

    carousel.onDrag(
        new TouchEvent('touchstart', {
            touches: [touchObj],
            changedTouches: [touchObj]
        })
    );

    dispatchTouchEvent(document, 'touchmove', 500 - distance, 0);
    setTimeout(() => {
        dispatchTouchEvent(document, 'touchend');
    }, delay);
}

export function windowResize() {
    dispatchEvent(window, new Event('resize'));
}
