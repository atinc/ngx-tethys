import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyFullscreenMode, ThyFullscreenService } from './fullscreen.service';
@Component({
    selector: 'thy-fullscreen',
    templateUrl: './fullscreen.component.html',
    providers: [ThyFullscreenService]
})
export class ThyFullscreenComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() thyMode: ThyFullscreenMode = ThyFullscreenMode.immersive;

    @Input() thyFullscreenClasses: string;

    @Output() thyFullscreenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private ngUnsubscribe$ = new Subject();

    constructor(private elementRef: ElementRef, private service: ThyFullscreenService) {}

    ngOnInit() {
        this.service
            .getIsFullscreen$()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(isFullscreen => {
                this.thyFullscreenChange.emit(isFullscreen);
            });
    }

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
        const fullscreen = this.service.getIsFullscreen$().value;

        if (fullscreen) {
            this.service.closeFullscreen();
        } else {
            this.service.openFullscreen({
                mode: this.thyMode,
                target: targetElement,
                classes: this.thyFullscreenClasses,
                container: containerElement
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
