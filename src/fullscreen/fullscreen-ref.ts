import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyFullscreenConfig, ThyFullscreenMode } from './fullscreen.config';
import { ESCAPE } from '@angular/cdk/keycodes';

export class ThyFullscreenRef<TResult = unknown> {
    fullscreenConfig: ThyFullscreenConfig;

    private isFullscreen = false;

    private ngUnsubscribe$ = new Subject();

    private readonly _afterLaunched = new Subject<TResult>();

    private readonly _afterExited = new Subject<TResult>();

    constructor(@Inject(DOCUMENT) protected document: any) {}

    private onFullscreenChange() {
        const isFullScreen = this.isImmersiveFullscreen();
        if (isFullScreen) {
            this.launchNormalFullscreen();
        } else {
            this.exitNormalFullscreen();
        }
    }

    private resetElement(element: string | Element | ElementRef) {
        const targetType = typeof element;
        if (targetType === 'string') {
            return this.document.querySelector(`.${element}`);
        } else {
            return coerceElement(element);
        }
    }

    private isImmersiveFullscreen() {
        const doc = this.document;
        return !!(doc['fullscreenElement'] || doc['mozFullScreenElement'] || doc['webkitFullscreenElement'] || doc['msFullscreenElement']);
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.keyCode === ESCAPE) {
            if (this.isFullscreen && this.fullscreenConfig.mode === ThyFullscreenMode.emulated) {
                this.exitNormalFullscreen();
            }
        }
    }

    private launchNormalFullscreen() {
        const targetElement = this.resetElement(this.fullscreenConfig.target);
        const classes = this.fullscreenConfig.targetLaunchededClasse;
        const container = this.fullscreenConfig.emulatedContainer;
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
        this.isFullscreen = true;
        this._afterLaunched.next();
    }

    private exitNormalFullscreen() {
        const targetElement = this.resetElement(this.fullscreenConfig.target);
        const classes = this.fullscreenConfig.targetLaunchededClasse;
        const container = this.fullscreenConfig.emulatedContainer;
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

        this.isFullscreen = false;
        this._afterExited.next();

        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    protected launchImmersiveFullscreen() {
        const docElement = this.document.documentElement;

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

    protected exitImmersiveFullscreen() {
        const doc = this.document;
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

    launch() {
        if (this.fullscreenConfig.mode === ThyFullscreenMode.immersive) {
            merge(
                fromEvent(this.document, 'fullscreenchange'),
                fromEvent(this.document, 'MSFullscreenChange'),
                fromEvent(this.document, 'webkitfullscreenchange')
            )
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.onFullscreenChange();
                });
            this.launchImmersiveFullscreen();
        } else {
            fromEvent(this.document, 'keydown')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(event => {
                    this.handleKeyDown(event as KeyboardEvent);
                });
            this.launchNormalFullscreen();
        }
    }

    exit() {
        if (this.fullscreenConfig.mode === ThyFullscreenMode.immersive) {
            this.exitImmersiveFullscreen();
        } else {
            this.exitNormalFullscreen();
        }
    }

    afterLaunched(): Observable<TResult> {
        return this._afterLaunched.asObservable();
    }

    afterExited(): Observable<TResult> {
        return this._afterExited.asObservable();
    }
}
