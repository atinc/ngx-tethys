import { coerceElement } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';

import { ElementRef, Inject, NgZone, DOCUMENT } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyFullscreenConfig, ThyFullscreenMode } from './fullscreen.config';

export class ThyFullscreenRef<TResult = unknown> {
    fullscreenConfig!: ThyFullscreenConfig;

    private isFullscreen = false;

    private ngUnsubscribe$ = new Subject<void>();

    private readonly _afterLaunched = new Subject<TResult | undefined>();

    private readonly _afterExited = new Subject<TResult | undefined>();

    constructor(
        @Inject(DOCUMENT) protected document: Document,
        private ngZone: NgZone
    ) {}

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
        // @ts-ignore
        return !!(doc['fullscreenElement'] || doc['mozFullScreenElement'] || doc['webkitFullscreenElement'] || doc['msFullscreenElement']);
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (event.keyCode === ESCAPE) {
            if (this.isFullscreen && this.fullscreenConfig.mode === ThyFullscreenMode.emulated) {
                this.ngZone.run(() => this.exitNormalFullscreen());
            }
        }
    };

    private launchNormalFullscreen() {
        const targetElement = this.resetElement(this.fullscreenConfig.target);
        const classes = this.fullscreenConfig.targetLaunchedClass;
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
        this._afterLaunched.next(undefined);
    }

    private exitNormalFullscreen() {
        const targetElement = this.resetElement(this.fullscreenConfig.target);
        const classes = this.fullscreenConfig.targetLaunchedClass;
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
        this._afterExited.next(undefined);
        this._afterExited.complete();

        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    protected launchImmersiveFullscreen() {
        const { documentElement } = this.document;

        const requestFullscreen: HTMLElement['requestFullscreen'] | undefined =
            documentElement.requestFullscreen ||
            documentElement['mozRequestFullScreen'] ||
            documentElement['webkitRequestFullscreen'] ||
            documentElement['msRequestFullscreen'];

        if (typeof requestFullscreen === 'function') {
            // Note: the `requestFullscreen` returns a promise that resolves when the full screen is initiated.
            // The promise may reject with a `fullscreen error`. The browser warns into the console before rejecting:
            // `Failed to execute ‘requestFullScreen’ on ‘Element’: API can only be initiated by a user gesture.`.
            // We explicitly call `catch` and redirect the rejection to `console.error`.
            // Otherwise, this fill fail in unit tests with the following error:
            // `An error was thrown in afterAll. Unhandled promise rejection: TypeError: fullscreen error`.
            requestFullscreen.call(documentElement)?.catch(console.error);
        }
    }

    protected exitImmersiveFullscreen() {
        const { document } = this;

        const exitFullscreen: Document['exitFullscreen'] | undefined =
            // @ts-ignore
            document.exitFullscreen || document['mozCancelFullScreen'] || document['webkitExitFullscreen'] || document['msExitFullscreen'];

        if (typeof exitFullscreen === 'function') {
            exitFullscreen.call(document)?.catch(console.error);
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
            this.ngZone.runOutsideAngular(() =>
                fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(takeUntil(this.ngUnsubscribe$)).subscribe(this.handleKeyDown)
            );

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

    afterLaunched(): Observable<TResult | undefined> {
        return this._afterLaunched.asObservable();
    }

    afterExited(): Observable<TResult | undefined> {
        return this._afterExited.asObservable();
    }
}
