import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    Host,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    TemplateRef
} from '@angular/core';
import { ThyHotkeyDispatcher } from '@tethys/cdk/hotkey';
import { isMacPlatform } from '@tethys/cdk/is';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandleComponent } from 'ngx-tethys/resizable';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { Subscription } from 'rxjs';
import { ThyLayoutComponent } from './layout.component';

const LG_WIDTH = 300;
const SIDEBAR_DEFAULT_WIDTH = 240;

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
            (thyResizeEnd)="resizeEnd()"
            [style.display]="!collapseVisible ? 'contents' : null"
        >
            <thy-resize-handle
                *ngIf="!thyCollapsed"
                thyDirection="right"
                class="sidebar-resize-handle"
                thyLine="true"
                (mouseenter)="resizeHandleHover($event, 'enter')"
                (mouseleave)="resizeHandleHover($event, 'leave')"
                (dblclick)="restoreToDefaultWidth()"
            >
            </thy-resize-handle>
        </div>
        <div *ngIf="thyCollapsible" class="sidebar-collapse-line"></div>
        <div
            *ngIf="thyCollapsible && thyTrigger !== null"
            class="sidebar-collapse"
            [ngClass]="{ 'collapse-visible': collapseVisible, 'collapse-hidden': collapseHidden }"
            (click)="toggleCollapse($event)"
            [thyTooltip]="!thyTrigger && collapseTip"
        >
            <ng-template [ngTemplateOutlet]="thyTrigger || defaultTrigger"></ng-template>
            <ng-template #defaultTrigger>
                <thy-icon class="sidebar-collapse-icon" [thyIconName]="this.thyCollapsed ? 'indent' : 'outdent'"></thy-icon>
            </ng-template>
        </div>
    `,
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, ThyResizeHandleComponent, ThyResizableDirective]
})
export class ThySidebarComponent implements OnInit, OnDestroy {
    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;

    @HostBinding('class.thy-layout-sidebar--clear-border-right') thyLayoutSidebarClearBorderRightClass = false;

    @HostBinding('class.sidebar-theme-light') sidebarThemeLight = false;

    @HostBinding('class.sidebar-theme-dark') sidebarThemeDark = false;

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
        this.thyLayoutSidebarWidth = value || SIDEBAR_DEFAULT_WIDTH;
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

    @Input() thyDragMaxWidth: number;

    @Input() thyTrigger: null | undefined | TemplateRef<any> = undefined;

    @Output()
    thyCollapsedChange = new EventEmitter<boolean>();

    @Output()
    thyDragWidthChange = new EventEmitter<number>();

    @Input() @InputBoolean() set thyCollapsible(collapsible: boolean) {
        this.collapsible = collapsible;
        if (this.collapsible) {
            this.subscribeHotkeyEvent();
        } else {
            this.hotkeySubscription?.unsubscribe();
        }
    }

    get thyCollapsible() {
        return this.collapsible;
    }

    @Input() @InputBoolean() set thyCollapsed(value: boolean) {
        this.isCollapsed = value;
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

    @Input() thyDefaultWidth: string | number;

    @HostBinding('class.sidebar-collapse-show')
    get collapseVisibility() {
        return this.thyCollapsed;
    }

    @HostBinding('class.remove-transition')
    get removeTransition() {
        return this.isRemoveTransition;
    }

    collapseTip: string;

    collapsible: boolean;

    isCollapsed = false;

    originWidth: number = SIDEBAR_DEFAULT_WIDTH;

    collapseVisible: boolean;

    collapseHidden: boolean;

    isRemoveTransition: boolean;

    private hotkeySubscription: Subscription;

    constructor(
        @Optional() @Host() private thyLayoutComponent: ThyLayoutComponent,
        public elementRef: ElementRef,
        private hotkeyDispatcher: ThyHotkeyDispatcher
    ) {}

    ngOnInit() {
        if (this.thyLayoutComponent) {
            this.thyLayoutComponent.hasSidebar = true;
        }
        this.updateCollapseTip();
    }

    private subscribeHotkeyEvent() {
        this.hotkeySubscription = this.hotkeyDispatcher.keydown(['Control+/', 'Meta+/']).subscribe(() => {
            this.toggleCollapse();
        });
    }

    private updateCollapseTip() {
        this.collapseTip = this.thyCollapsed ? '展开' : '收起';
        this.collapseTip = this.collapseTip + (isMacPlatform() ? `（⌘ + /)` : `（Ctrl + /)`);
    }

    resizeHandler({ width }: ThyResizeEvent) {
        if (width === this.thyLayoutSidebarWidth) {
            return;
        }
        if (this.thyCollapsible && width < this.thyCollapsedWidth) {
            return;
        }
        if (this.thyCollapsible && width === this.thyCollapsedWidth) {
            this.thyCollapsed = true;
            setTimeout(() => this.updateCollapseTip(), 200);
            this.thyCollapsedChange.emit(this.isCollapsed);
            this.thyLayoutSidebarWidth = this.originWidth;
            this.collapseVisible = false;
            return;
        }
        this.thyLayoutSidebarWidth = width;
        this.thyDragWidthChange.emit(width);
    }

    resizeStart() {
        this.originWidth = this.thyLayoutSidebarWidth;
        this.collapseHidden = true;
        this.isRemoveTransition = true;
    }

    resizeEnd() {
        this.collapseHidden = false;
        this.isRemoveTransition = false;
    }

    resizeHandleHover(event: MouseEvent, type: 'enter' | 'leave') {
        this.collapseVisible = type === 'enter' ? true : false;
    }

    toggleCollapse(event?: MouseEvent) {
        this.thyCollapsed = !this.thyCollapsed;
        setTimeout(() => this.updateCollapseTip(), 200);
        this.thyCollapsedChange.emit(this.isCollapsed);
    }

    restoreToDefaultWidth() {
        if (this.thyDefaultWidth === 'lg') {
            this.thyDefaultWidth = LG_WIDTH;
        }
        this.thyLayoutSidebarWidth = (this.thyDefaultWidth as number) || SIDEBAR_DEFAULT_WIDTH;
        this.thyDragWidthChange.emit(this.thyLayoutSidebarWidth);
    }

    ngOnDestroy(): void {
        this.hotkeySubscription?.unsubscribe();
    }
}
