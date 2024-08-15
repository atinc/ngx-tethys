import { Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EMPTY, fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ThyFullscreen } from './fullscreen.service';
import { ThyFullscreenMode } from './fullscreen.config';
import { ThyFullscreenLaunchDirective } from './fullscreen-launch.directive';

/**
 * 全屏组件，将某一区域进行全屏展示，支持组件`thy-fullscreen`和`thyFullscreen`指令两种形式
 * @name thy-fullscreen,[thyFullscreen]
 * @order 10
 */
@Component({
    selector: 'thy-fullscreen, [thyFullscreen]',
    templateUrl: './fullscreen.component.html',
    standalone: true
})
export class ThyFullscreenComponent implements OnInit, OnDestroy {
    /**
     * immersive 模式使用了浏览器提供的全屏，整个窗体都全屏，emulated 模式为仿真的，只会在 body 区域全屏
     * @type immersive | emulated
     * @default immersive
     */
    @Input() thyMode: ThyFullscreenMode = ThyFullscreenMode.immersive;

    /**
     * 打开全屏时需要添加的类名
     */
    @Input() thyFullscreenClasses: string;

    /**
     * 全屏之后的回调
     */
    @Output() thyFullscreenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChild(ThyFullscreenLaunchDirective, { read: ElementRef, static: false })
    set fullscreenLaunch(fullscreenLaunch: ElementRef<HTMLButtonElement> | undefined) {
        this.fullscreenLaunch$.next(fullscreenLaunch);
    }

    private ngUnsubscribe$ = new Subject<void>();
    private fullscreenLaunch$ = new Subject<ElementRef<HTMLButtonElement> | undefined>();

    constructor(
        private elementRef: ElementRef,
        private service: ThyFullscreen
    ) {}

    ngOnInit(): void {
        this.fullscreenLaunch$
            .pipe(
                switchMap(fullscreenLaunch => (fullscreenLaunch ? fromEvent(fullscreenLaunch.nativeElement, 'click') : EMPTY)),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe(this.handleFullscreen);
    }

    // Toggles full screen on or off.
    private handleFullscreen = () => {
        const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
        const containerElement = this.elementRef.nativeElement.querySelector('[fullscreen-container]');
        const fullscreen = targetElement.classList.contains('thy-fullscreen-active');

        if (fullscreen) {
            this.service.exit();
        } else {
            const fullscreenRef = this.service.launch({
                mode: this.thyMode,
                target: targetElement,
                targetLaunchedClass: this.thyFullscreenClasses,
                emulatedContainer: containerElement
            });

            this.thyFullscreenChange.emit(true);

            fullscreenRef.afterExited().subscribe(() => {
                this.thyFullscreenChange.emit(false);
            });
        }
    };

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
    }
}
