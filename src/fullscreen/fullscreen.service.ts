import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ESCAPE } from 'ngx-tethys/util';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';

export interface ThyFullscreenConfig {
    mode: ThyFullscreenMode;
    target: string | Element | ElementRef;
    classes?: string;
    container?: string | Element | ElementRef;
}

export type ThyFullscreenMode = 'immersive' | 'normal';

export const defaultFullscreenMode = 'immersive';
@Injectable({
    providedIn: 'root'
})
export class ThyFullscreenService {
    private fullscreenChange$: Observable<any>;

    private keydownEvent$: Observable<KeyboardEvent>;

    private ngUnsubscribe$ = new Subject();

    private fullscreenConfig: ThyFullscreenConfig;

    private isFullscreen$ = new BehaviorSubject<boolean>(false);

    constructor(@Inject(DOCUMENT) protected document: any) {
        this.fullscreenChange$ = merge(
            fromEvent(this.document, 'fullscreenchange'),
            fromEvent(this.document, 'MSFullscreenChange'),
            fromEvent(this.document, 'webkitfullscreenchange')
        );

        this.keydownEvent$ = fromEvent(this.document, 'keydown');
    }

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
            const isFullscreen = this.isFullscreen$.value;
            if (isFullscreen && this.fullscreenConfig.mode === 'normal') {
                this.exitNormalFullscreen();
            }
        }
    }

    private launchNormalFullscreen() {
        const targetElement = this.resetElement(this.fullscreenConfig.target);
        const classes = this.fullscreenConfig.classes;
        const container = this.fullscreenConfig.container;
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
        this.isFullscreen$.next(true);
    }

    private exitNormalFullscreen() {
        const targetElement = this.resetElement(this.fullscreenConfig.target);
        const classes = this.fullscreenConfig.classes;
        const container = this.fullscreenConfig.container;
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

        this.isFullscreen$.next(false);

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

    openFullscreen(config: ThyFullscreenConfig) {
        this.fullscreenConfig = config;
        if (config.mode === defaultFullscreenMode) {
            this.fullscreenChange$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
                this.onFullscreenChange();
            });
            this.launchImmersiveFullscreen();
        } else {
            this.keydownEvent$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
                this.handleKeyDown(event);
            });
            this.launchNormalFullscreen();
        }
    }

    closeFullscreen() {
        if (this.fullscreenConfig.mode === defaultFullscreenMode) {
            this.exitImmersiveFullscreen();
        } else {
            this.exitNormalFullscreen();
        }
    }

    getIsFullscreen$() {
        return this.isFullscreen$;
    }
}
