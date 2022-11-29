import { Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EMPTY, fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ThyFullscreen } from './fullscreen.service';
import { ThyFullscreenMode } from './fullscreen.config';
import { ThyFullscreenLaunchDirective } from './fullscreen-launch.directive';

@Component({
    selector: 'thy-fullscreen, [thyFullscreen]',
    templateUrl: './fullscreen.component.html'
})
export class ThyFullscreenComponent implements OnInit, OnDestroy {
    @Input() thyMode: ThyFullscreenMode = ThyFullscreenMode.immersive;

    @Input() thyFullscreenClasses: string;

    @Output() thyFullscreenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChild(ThyFullscreenLaunchDirective, { read: ElementRef, static: false })
    set fullscreenLaunch(fullscreenLaunch: ElementRef<HTMLButtonElement> | undefined) {
        this.fullscreenLaunch$.next(fullscreenLaunch);
    }

    private ngUnsubscribe$ = new Subject<void>();
    private fullscreenLaunch$ = new Subject<ElementRef<HTMLButtonElement> | undefined>();

    constructor(private elementRef: ElementRef, private service: ThyFullscreen) {}

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
