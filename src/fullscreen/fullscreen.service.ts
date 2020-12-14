import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThyFullscreenService {
    fullscreen$ = new BehaviorSubject<boolean>(false);

    constructor(@Inject(DOCUMENT) private document: any) {}

    private resetElement(element: string | Element | ElementRef) {
        const targetType = typeof element;
        if (targetType === 'string') {
            return this.document.querySelector(`.${element}`);
        } else {
            return coerceElement(element);
        }
    }

    launchNormalFullscreen(target: string | Element | ElementRef, classes?: string, container?: string | Element | ElementRef) {
        const targetElement = this.resetElement(target);
        if (container) {
            const containerElement = this.resetElement(container);
            const containerClientRect = containerElement.getBoundingClientRect();
            const targetClientRect = targetElement.getBoundingClientRect();
            const distanceX = containerClientRect.left - targetClientRect.left;
            const distanceY = containerClientRect.top - targetClientRect.top;
            targetElement.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
            targetElement.style.width = `${containerClientRect.width}px`;
            targetElement.style.height = `${containerClientRect.height}px`;
        } else {
            targetElement.classList.add('thy-fullscreen');
        }
        targetElement.classList.add('thy-fullscreen-active');
        if (classes && classes.length) {
            targetElement.classList.add(classes);
        }
        this.fullscreen$.next(true);
    }

    exitNormalFullscreen(target: string | Element | ElementRef, classes?: string, container?: string | Element | ElementRef) {
        const targetElement = this.resetElement(target);
        if (container) {
            targetElement.style.transform = ``;
            targetElement.style.width = ``;
            targetElement.style.height = ``;
        } else {
            targetElement.classList.remove('thy-fullscreen');
        }
        targetElement.classList.remove('thy-fullscreen-active');
        if (classes && classes.length) {
            targetElement.classList.remove(classes);
        }
        this.fullscreen$.next(false);
    }

    launchImmersiveFullscreen(docElement: HTMLElement) {
        if (docElement.requestFullscreen) {
            docElement.requestFullscreen();
        } else if (docElement['mozRequestFullScreen']) {
            docElement['mozRequestFullScreen']();
        } else if (docElement['webkitRequestFullscreen']) {
            docElement['webkitRequestFullscreen']();
        } else if (docElement['msRequestFullscreen']) {
            docElement['msRequestFullscreen']();
        }
    }

    exitImmersiveFullscreen(doc: Document) {
        if (doc['exitFullscreen']) {
            doc['exitFullscreen']();
        } else if (doc['mozCancelFullScreen']) {
            doc['mozCancelFullScreen']();
        } else if (doc['webkitExitFullscreen']) {
            doc['webkitExitFullscreen']();
        } else if (doc['msExitFullscreen']) {
            doc['msExitFullscreen']();
        }
    }

    isImmersiveFullscreen(doc: Document) {
        return !!(doc['fullscreenElement'] || doc['mozFullScreenElement'] || doc['webkitFullscreenElement'] || doc['msFullscreenElement']);
    }

    getIsFullscreen() {
        return this.fullscreen$;
    }
}
