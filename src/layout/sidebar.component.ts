import {
    Component,
    HostBinding,
    Host,
    Optional,
    OnInit,
    Input,
    ViewChild,
    Renderer2,
    ElementRef,
    NgZone
} from '@angular/core';
import { ThyLayoutComponent } from './layout.component';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-sidebar',
    preserveWhitespaces: false,
    template: `
        <ng-content></ng-content>
        <div
            class="sidebar-drag"
            #dragRef
            cdkDrag
            cdkDragLockAxis="x"
            cdkDragBoundary=".thy-layout"
            (cdkDragStarted)="dragStartedHandler()"
            (cdkDragEnded)="dragEndedHandler()"
        ></div>
    `
})
export class ThySidebarComponent implements OnInit {
    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;

    @HostBinding('class.thy-layout-sidebar--clear-border-right') thyLayoutSidebarClearBorderRightClass = false;

    @HostBinding('style.width.px') thyLayoutSidebarWidth: number;

    @Input('thyWidth')
    set thyWidth(value: any) {
        this.thyLayoutSidebarWidth = value;
        this.widthPassive = value;
    }

    @Input('thyHasBorderRight')
    set thyHasBorderRight(value: string) {
        this.thyLayoutSidebarClearBorderRightClass = !inputValueToBoolean(value);
    }

    @Input('thyIsDraggableWidth')
    set thyIsDraggableWidth(value: any) {
        if (inputValueToBoolean(value)) {
            this.renderer.setStyle(this.dragRef.nativeElement, 'pointer-events', 'all');
        }
    }

    @ViewChild('dragRef') dragRef: any;

    dragStartedX: number;

    widthPassive: number;

    constructor(
        @Optional() @Host() private thyLayoutComponent: ThyLayoutComponent,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        if (this.thyLayoutComponent) {
            this.thyLayoutComponent.hasSidebar = true;
        }
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.widthPassive = this.elementRef.nativeElement.clientWidth;
                this.renderer.setStyle(
                    this.dragRef.nativeElement,
                    'left',
                    this.numberConvertToFloor(this.widthPassive) + 'px'
                );
            }, 0);
        });
    }

    dragStartedHandler() {
        this.dragStartedX = this.dragRef.nativeElement.getBoundingClientRect().x;
    }

    dragEndedHandler() {
        const x = this.dragRef.nativeElement.getBoundingClientRect().x;
        this.widthPassive = this.numberConvertToFloor(this.widthPassive * 1 + (x - this.dragStartedX));
        this.thyLayoutSidebarWidth = this.widthPassive;
    }

    private numberConvertToFloor(value: number | string) {
        let result = Math.floor((value as any) * 1);
        if (result < 1) {
            result = 1;
        }
        return result;
    }
}
