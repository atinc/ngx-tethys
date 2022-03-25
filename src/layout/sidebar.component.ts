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
    NgZone,
    Output,
    EventEmitter
} from '@angular/core';
import { ThyLayoutComponent } from './layout.component';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { InputBoolean } from 'ngx-tethys/core';

const LG_WIDTH = 300;
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
        <div *ngIf="thyCollapsible" class="sidebar-collapse" (click)="toggleCollapse($event)" [thyTooltip]="collapseTip">
            <thy-icon class="sidebar-collapse-icon" [thyIconName]="collapseIconName"></thy-icon>
        </div>
    `
})
export class ThySidebarComponent implements OnInit {
    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;

    @HostBinding('class.thy-layout-sidebar--clear-border-right') thyLayoutSidebarClearBorderRightClass = false;

    thyLayoutSidebarWidth: number;

    @HostBinding('style.width.px') get sidebarWidth() {
        if (this.thyCollapsible && this.thyCollapsed) {
            return this.thyCollapsedWidth;
        } else {
            return this.thyLayoutSidebarWidth;
        }
    }

    @HostBinding('class.thy-layout-sidebar-isolated') sidebarIsolated = false;

    @Input('thyWidth')
    set thyWidth(value: any) {
        if (value === 'lg') {
            value = LG_WIDTH;
        }
        this.thyLayoutSidebarWidth = value;
        this.widthPassive = value;
    }

    @Input('thyHasBorderRight')
    set thyHasBorderRight(value: string) {
        this.thyLayoutSidebarClearBorderRightClass = !coerceBooleanProperty(value);
    }

    @Input('thyIsolated')
    set thyIsolated(value: string) {
        this.sidebarIsolated = coerceBooleanProperty(value);
    }

    @Input('thyIsDraggableWidth')
    set thyIsDraggableWidth(value: any) {
        this.isDraggableWidth = coerceBooleanProperty(value);
        this.setDraggable();
    }

    @ViewChild('dragRef', { static: true }) dragRef: any;

    dragStartedX: number;

    widthPassive: number;

    isDraggableWidth: boolean;

    @Output()
    thyCollapsedChange = new EventEmitter();

    @Input() @InputBoolean() thyCollapsible = false;

    @Input() @InputBoolean() thyCollapsed = false;

    @Input() thyCollapsedWidth = 20;

    @HostBinding('class.sidebar-collapse-show')
    get collapseVisibility() {
        return this.thyCollapsed;
    }

    get collapseIconName() {
        return this.thyCollapsed ? 'indent-bold' : 'outdent-bold';
    }

    collapseTip: string;

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
        this.setDraggable();
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.widthPassive = this.elementRef.nativeElement.clientWidth;
                this.renderer.setStyle(this.dragRef.nativeElement, 'left', this.numberConvertToFloor(this.widthPassive) + 'px');
            }, 0);
        });
    }

    setDraggable() {
        if (!this.dragRef) {
            return;
        }
        this.renderer.setStyle(this.dragRef.nativeElement, 'pointer-events', this.isDraggableWidth ? 'all' : '');
    }

    dragStartedHandler() {
        this.dragStartedX = this.dragRef.nativeElement.getBoundingClientRect().x;
    }

    dragEndedHandler() {
        const x = this.dragRef.nativeElement.getBoundingClientRect().x;
        this.widthPassive = this.numberConvertToFloor(this.widthPassive * 1 + (x - this.dragStartedX));
        this.thyLayoutSidebarWidth = this.widthPassive;
        this.thyCollapsed = this.thyLayoutSidebarWidth > this.thyCollapsedWidth ? false : true;
    }

    private numberConvertToFloor(value: number | string) {
        let result = Math.floor((value as any) * 1);
        if (result < 1) {
            result = 1;
        }
        return result;
    }

    toggleCollapse(event: MouseEvent) {
        this.thyCollapsed = !this.thyCollapsed;
        setTimeout(() => {
            this.collapseTip = this.thyCollapsed ? '展开' : '收起';
        }, 200);
        this.thyCollapsedChange.emit(this.thyCollapsed);
    }
}
