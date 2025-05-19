import { Component, ElementRef, OnDestroy, OnInit, contentChild, effect, inject, input, output } from '@angular/core';
import { ThyFullscreen } from './fullscreen.service';
import { ThyFullscreenMode } from './fullscreen.config';
import { ThyFullscreenLaunchDirective } from './fullscreen-launch.directive';
import { EMPTY, fromEvent, Subject, switchMap, takeUntil } from 'rxjs';

/**
 * 全屏组件，将某一区域进行全屏展示，支持组件`thy-fullscreen`和`thyFullscreen`指令两种形式
 * @name thy-fullscreen,[thyFullscreen]
 * @order 10
 */
@Component({
    selector: 'thy-fullscreen, [thyFullscreen]',
    templateUrl: './fullscreen.component.html'
})
export class ThyFullscreenComponent implements OnInit, OnDestroy {
    private elementRef = inject(ElementRef);
    private service = inject(ThyFullscreen);

    /**
     * immersive 模式使用了浏览器提供的全屏，整个窗体都全屏，emulated 模式为仿真的，只会在 body 区域全屏
     * @type immersive | emulated
     */
    readonly thyMode = input<ThyFullscreenMode>(ThyFullscreenMode.immersive);

    /**
     * 打开全屏时需要添加的类名
     */
    readonly thyFullscreenClasses = input<string>();

    /**
     * 全屏之后的回调
     */
    readonly thyFullscreenChange = output<boolean>();

    readonly fullscreenLaunch = contentChild<ThyFullscreenLaunchDirective, ElementRef>(ThyFullscreenLaunchDirective, {
        read: ElementRef
    });

    private ngUnsubscribe$ = new Subject<void>();

    private fullscreenLaunch$ = new Subject<ElementRef<HTMLButtonElement> | undefined>();

    constructor() {
        effect(() => {
            this.fullscreenLaunch$.next(this.fullscreenLaunch());
        });
    }

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
                mode: this.thyMode(),
                target: targetElement,
                targetLaunchedClass: this.thyFullscreenClasses(),
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
        this.ngUnsubscribe$.complete();
    }
}
