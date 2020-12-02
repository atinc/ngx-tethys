import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { StyxFullscreenService } from './fullscreen.service';

export type FullscreenMode = 'immersive' | 'normal';

export const DEFAULT_MODE = 'immersive';

export const ESC_KEY = 'Escape';

@Component({
    selector: 'thy-fullscreen',
    templateUrl: './fullscreen.component.html'
})
export class ThyFullscreenComponent implements OnInit, AfterViewInit, OnDestroy {
    private currentTarget: HTMLElement;

    private isFullscreen = false;

    @Input() thyMode: FullscreenMode = DEFAULT_MODE;

    @Input() thyFullscreenClasses: string;

    @Output() thyFullscreenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private doc: any, private service: StyxFullscreenService) {}

    ngOnInit() {
        document.addEventListener('fullscreenchange', this.onFullscreenChange);
        document.addEventListener('MSFullscreenChange', this.onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    ngAfterViewInit() {
        const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
        if (btnLaunch) {
            btnLaunch.addEventListener('click', this.handleFullscreen);
        }
    }

    // 沉浸式全屏时通过监听fullscreenchange事件将全屏状态传出去
    private onFullscreenChange = () => {
        if (this.currentTarget) {
            const targetElement: HTMLElement = this.currentTarget;
            const isFullscreen = this.service.isImmersiveFullscreen(this.doc);
            if (!isFullscreen) {
                this.service.exitNormalFullscreen(targetElement, this.thyFullscreenClasses);
                this.isFullscreen = isFullscreen;
                this.thyFullscreenChange.emit(this.isFullscreen);
            }
        }
    };

    // 点击打开或关闭全屏
    private handleFullscreen = () => {
        const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
        const containerElement = this.elementRef.nativeElement.querySelector('[fullscreen-container]');
        const fullscreen = targetElement.classList.contains('thy-fullscreen-active');
        this.currentTarget = targetElement;
        let isFullscreen;
        if (fullscreen) {
            if (this.thyMode === DEFAULT_MODE) {
                this.service.exitImmersiveFullscreen(this.doc);
            }
            this.service.exitNormalFullscreen(targetElement, this.thyFullscreenClasses, containerElement);
            isFullscreen = false;
        } else {
            if (this.thyMode === DEFAULT_MODE) {
                this.service.launchImmersiveFullscreen(this.doc.documentElement);
            }
            this.service.launchNormalFullscreen(targetElement, this.thyFullscreenClasses, containerElement);
            isFullscreen = true;
        }

        this.isFullscreen = isFullscreen;
        this.thyFullscreenChange.emit(this.isFullscreen);
    };

    // normal模式下按ESC键退出全屏
    private handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === ESC_KEY) {
            if (this.isFullscreen && this.thyMode === 'normal') {
                const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
                const containerElement = this.elementRef.nativeElement.querySelector('[fullscreen-container]');
                this.service.exitNormalFullscreen(targetElement, this.thyFullscreenClasses, containerElement);
                this.isFullscreen = false;
                this.thyFullscreenChange.emit(this.isFullscreen);
            }
        }
    };

    ngOnDestroy() {
        document.removeEventListener('fullscreenchange', this.onFullscreenChange);
        document.removeEventListener('keydown', this.handleKeyDown);
        const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
        if (btnLaunch) {
            btnLaunch.removeEventListener('click', this.handleFullscreen);
        }
    }
}
