import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * @internal
 */
@Directive({
    selector: '[thyColorCoordinates]'
})
export class ThyCoordinatesDirective implements OnInit, OnDestroy {
    el = inject(ElementRef);

    @Output()
    coordinatesChange = new Subject<{
        x: number;
        y: number;
        left: number;
        top: number;
        containerWidth: number;
        containerHeight: number;
        $event: any;
    }>();

    private mousechange = new Subject<{
        x: number;
        y: number;
        $event: any;
    }>();

    private mouseListening = false;

    private sub?: Subscription;

    @HostListener('mousedown', ['$event', '$event.pageX', '$event.pageY'])
    mousedown($event: Event, x: number, y: number) {
        $event.preventDefault();
        this.mouseListening = true;
        this.mousechange.next({ x, y, $event });
    }

    @HostListener('window:mousemove', ['$event', '$event.pageX', '$event.pageY'])
    mousemove($event: Event, x: number, y: number) {
        if (this.mouseListening) {
            $event.preventDefault();
            this.mousechange.next({ x, y, $event });
        }
    }

    @HostListener('window:mouseup')
    mouseup() {
        this.mouseListening = false;
    }

    ngOnInit() {
        this.sub = this.mousechange
            .pipe(distinctUntilChanged((last, current) => last.x === current.x && last.y === current.y))
            .subscribe(n => this.handleChange(n.x, n.y, n.$event));
    }

    handleChange(x: number, y: number, $event: Event) {
        const containerWidth = this.el.nativeElement.clientWidth;
        const containerHeight = this.el.nativeElement.clientHeight;
        const left = x - (this.el.nativeElement.getBoundingClientRect().left + window.pageXOffset);
        const top = y - (this.el.nativeElement.getBoundingClientRect().top + window.pageYOffset);
        this.coordinatesChange.next({
            x,
            y,
            top,
            left,
            containerHeight,
            containerWidth,
            $event
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
