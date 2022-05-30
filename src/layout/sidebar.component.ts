import {
    Component,
    HostBinding,
    Host,
    Optional,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { ThyLayoutComponent } from './layout.component';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyResizeEvent } from '../resizable';

const LG_WIDTH = 300;

export type ThySidebarTheme = 'white' | 'light' | 'dark';
@Component({
    selector: 'thy-sidebar',
    preserveWhitespaces: false,
    template: `
        <ng-content></ng-content>
        <div
            thyResizable
            class="sidebar-drag"
            *ngIf="thyDraggable"
            thyBounds="window"
            [thyMaxWidth]="thyDragMaxWidth"
            [thyMinWidth]="thyCollapsedWidth"
            (thyResize)="resizeHandler($event)"
            (thyResizeStart)="resizeStart()"
        >
            <thy-resize-handle *ngIf="!thyCollapsed" thyDirection="right" class="sidebar-resize-handle">
                <div class="sidebar-resize-line"></div>
            </thy-resize-handle>
        </div>
        <div *ngIf="thyCollapsible" class="sidebar-collapse-line"></div>
        <div
            *ngIf="thyCollapsible && thyTrigger !== null"
            class="sidebar-collapse"
            (click)="toggleCollapse($event)"
            [thyTooltip]="!thyTrigger && collapseTip"
        >
            <ng-template [ngTemplateOutlet]="thyTrigger || defaultTrigger"></ng-template>
            <ng-template #defaultTrigger>
                <thy-icon class="sidebar-collapse-icon" [thyIconName]="this.thyCollapsed ? 'indent' : 'outdent'"></thy-icon>
            </ng-template>
        </div>
    `
})
export class ThySidebarComponent implements OnInit {
    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;

    @HostBinding('class.thy-layout-sidebar--clear-border-right') thyLayoutSidebarClearBorderRightClass = false;

    @HostBinding('class.sidebar-theme-light') sidebarThemeLight = false;

    @HostBinding('class.sidebar-theme-dark') sidebarThemeDark = false;

    thyLayoutSidebarWidth: number = 240;

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
    }

    @Input('thyHasBorderRight')
    set thyHasBorderRight(value: string) {
        this.thyLayoutSidebarClearBorderRightClass = !coerceBooleanProperty(value);
    }

    @Input('thyIsolated')
    set thyIsolated(value: string) {
        this.sidebarIsolated = coerceBooleanProperty(value);
    }

    @Input() @InputBoolean() thyDraggable: boolean = false;

    @Input() thyDragMaxWidth: number = 700;

    @Input() thyTrigger: null | undefined | TemplateRef<any> = undefined;

    @Output()
    thyCollapsedChange = new EventEmitter();

    @Input() @InputBoolean() thyCollapsible = false;

    @Input() @InputBoolean() set thyCollapsed(value: boolean) {
        this.isCollapsed = value;
        setTimeout(() => this.updateCollapseTip(), 200);
        this.thyCollapsedChange.emit(this.thyCollapsed);
        this.thyLayoutSidebarClearBorderRightClass = !!this.thyCollapsed;
    }

    get thyCollapsed() {
        return this.isCollapsed;
    }

    @Input() thyCollapsedWidth = 20;

    @Input()
    set thyTheme(value: ThySidebarTheme) {
        if (value === 'light') {
            this.sidebarThemeLight = true;
        } else if (value === 'dark') {
            this.sidebarThemeDark = true;
        }
    }

    @HostBinding('class.sidebar-collapse-show')
    get collapseVisibility() {
        return this.thyCollapsed;
    }

    collapseTip: string;

    isCollapsed = false;

    originWidth: number = 240;

    constructor(@Optional() @Host() private thyLayoutComponent: ThyLayoutComponent, public elementRef: ElementRef) {}

    ngOnInit() {
        if (this.thyLayoutComponent) {
            this.thyLayoutComponent.hasSidebar = true;
        }
        this.updateCollapseTip();
    }

    resizeHandler({ width }: ThyResizeEvent) {
        console.log(width);
        if (width === this.thyLayoutSidebarWidth) {
            return;
        }
        if (this.thyCollapsible && width < this.thyCollapsedWidth) {
            return;
        }
        if (this.thyCollapsible && width === this.thyCollapsedWidth) {
            this.thyCollapsed = true;
            this.thyLayoutSidebarWidth = this.originWidth;
            return;
        }
        this.thyLayoutSidebarWidth = width;
    }

    resizeStart() {
        this.originWidth = this.thyLayoutSidebarWidth;
    }

    private updateCollapseTip() {
        this.collapseTip = this.thyCollapsed ? '展开' : '收起';
    }

    toggleCollapse(event: MouseEvent) {
        this.thyCollapsed = !this.thyCollapsed;
    }
}
