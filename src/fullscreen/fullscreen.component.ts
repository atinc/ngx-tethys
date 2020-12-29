import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyFullscreenMode } from './fullscreen.config';
import { ThyFullscreen } from './fullscreen.service';
@Component({
    selector: 'thy-fullscreen',
    templateUrl: './fullscreen.component.html'
})
export class ThyFullscreenComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() thyMode: ThyFullscreenMode = ThyFullscreenMode.immersive;

    @Input() thyFullscreenClasses: string;

    @Output() thyFullscreenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private ngUnsubscribe$ = new Subject();

    constructor(private elementRef: ElementRef, private service: ThyFullscreen) {}

    ngOnInit() {}

    ngAfterViewInit() {
        const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
        if (btnLaunch) {
            btnLaunch.addEventListener('click', this.handleFullscreen);
        }
    }

    // 点击打开或关闭全屏
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
                targetLaunchededClasse: this.thyFullscreenClasses,
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

        const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
        if (btnLaunch) {
            btnLaunch.removeEventListener('click', this.handleFullscreen);
        }
    }
}
