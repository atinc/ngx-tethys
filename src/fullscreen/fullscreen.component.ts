import { Component, ElementRef, contentChild, effect, inject, input, output } from '@angular/core';
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
    templateUrl: './fullscreen.component.html'
})
export class ThyFullscreenComponent {
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

    constructor() {
        effect(() => {
            this.fullscreenLaunch()?.nativeElement.addEventListener('click', () => {
                this.handleFullscreen();
            });
        });
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
}
