import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    Host,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    TemplateRef
} from '@angular/core';
import { ThyHotkeyDispatcher } from '@tethys/cdk/hotkey';
import { isMacPlatform } from '@tethys/cdk/is';
import { InputBoolean, InputNumber } from 'ngx-tethys/core';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandleComponent } from 'ngx-tethys/resizable';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { Subscription } from 'rxjs';
import { ThyLayoutComponent } from './layout.component';

const LG_WIDTH = 300;
const SIDEBAR_DEFAULT_WIDTH = 240;

export type ThySidebarTheme = 'white' | 'light' | 'dark';

/**
 * 布局侧边栏组件
 * @name thy-sidebar
 * @order 20
 */
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
            [style.display]="!isResizable ? 'contents' : null">
            <thy-resize-handle
                *ngIf="!thyCollapsed"
                [thyDirection]="sidebarPositionRight ? 'left' : 'right'"
                class="sidebar-resize-handle"
                thyLine="true"
                (mouseenter)="toggleResizable($event, 'enter')"
                (mouseleave)="toggleResizable($event, 'leave')"
                (dblclick)="restoreToDefaultWidth()">
            </thy-resize-handle>
        </div>
        <div *ngIf="thyCollapsible" class="sidebar-collapse-line"></div>
        <div
            *ngIf="thyCollapsible && thyTrigger !== null"
            class="sidebar-collapse"
            [ngClass]="{ 'collapse-visible': collapseVisible, 'collapse-hidden': collapseHidden }"
            (click)="toggleCollapse($event)"
            [thyTooltip]="!thyTrigger && collapseTip">
            <ng-template [ngTemplateOutlet]="thyTrigger || defaultTrigger"></ng-template>
            <ng-template #defaultTrigger>
                <thy-icon class="sidebar-collapse-icon" [thyIconName]="this.thyCollapsed ? 'indent' : 'outdent'"></thy-icon>
            </ng-template>
        </div>
    `,
    standalone: true,
    imports: [
        NgTemplateOutlet,
        NgIf,
        ThyResizeHandleComponent,
        ThyResizableDirective,
        ThyIconComponent,
        ThyTooltipDirective,
        NgClass,
        NgStyle
    ]
})
export class ThySidebarComponent implements OnInit, OnDestroy {
    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;

    @HostBinding('class.thy-layout-sidebar--clear-border-right') thyLayoutSidebarClearBorderRightClass = false;

    @HostBinding('class.thy-layout-sidebar--clear-border-left') thyLayoutSidebarClearBorderLeftClass = false;

    @HostBinding('class.sidebar-theme-light') sidebarThemeLight = false;

    @HostBinding('class.sidebar-theme-dark') sidebarThemeDark = false;

    @HostBinding('class.thy-layout-sidebar-right') sidebarPositionRight = false;

    thyLayoutSidebarWidth: number;

    @HostBinding('style.width.px') get sidebarWidth() {
        if (this.thyCollapsible && this.thyCollapsed) {
            return this.thyCollapsedWidth;
        } else {
            return this.thyLayoutSidebarWidth;
        }
    }

    @HostBinding('class.thy-layout-sidebar-isolated') sidebarIsolated = false;

    @HostListener('mouseenter', ['$event'])
    mouseenter($event: MouseEvent) {
        this.resizeHandleHover($event, 'enter');
    }

    @HostListener('mouseleave', ['$event'])
    mouseleave($event: MouseEvent) {
        this.resizeHandleHover($event, 'leave');
    }

    /**
     * 宽度，默认是 240px，传入 `lg` 大小时宽度是300px
     * @default 240px
     */
    @Input('thyWidth')
    set thyWidth(value: any) {
        if (value === 'lg') {
            value = LG_WIDTH;
        }
        this.thyLayoutSidebarWidth = value || SIDEBAR_DEFAULT_WIDTH;
    }

    /**
     * sidebar位置，默认在左侧
     * @default 'left'
     */
    @Input('thySidebarPosition')
    set thySidebarPosition(value: 'left' | 'right') {
        this.sidebarPositionRight = value === 'right' ? true : false;
    }

    /**
     * 右侧是否有边框
     * @default true
     */
    @Input('thyHasBorderRight')
    set thyHasBorderRight(value: string) {
        this.thyLayoutSidebarClearBorderRightClass = !coerceBooleanProperty(value);
    }

    /**
     * 左侧是否有边框
     * @default true
     */
    @Input('thyHasBorderLeft')
    set thyHasBorderLeft(value: string) {
        this.thyLayoutSidebarClearBorderLeftClass = !coerceBooleanProperty(value);
    }

    /**
     * 是否和右侧 /左侧隔离，当为 true 时距右侧 /左侧会有 margin，同时边框会去掉
     * @default false
     */
    @Input('thyIsolated')
    set thyIsolated(value: string) {
        this.sidebarIsolated = coerceBooleanProperty(value);
    }

    /**
     * 宽度是否可以拖拽
     * @default false
     */
    @Input() @InputBoolean() thyDraggable: boolean = false;

    /**
     * 拖拽的最大宽度
     */
    @Input() @InputNumber() thyDragMaxWidth: number;

    /**
     * 展示收起的触发器自定义模板，默认显示展开收起的圆形图标，设置为 null 表示不展示触发元素，手动控制展开收起状态
     * @type null | undefined | TemplateRef<any>
     * @default undefined
     */
    @Input() thyTrigger: null | undefined | TemplateRef<any> = undefined;

    /**
     * 收起状态改变后的事件
     */
    @Output()
    thyCollapsedChange = new EventEmitter<boolean>();

    /**
     * 拖拽宽度的修改事件
     */
    @Output()
    thyDragWidthChange = new EventEmitter<number>();

    /**
     * 开启收起/展开功能
     * @default false
     */
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

    /**
     * 是否是收起
     * @default false
     */
    @Input() @InputBoolean() set thyCollapsed(value: boolean) {
        this.isCollapsed = value;
    }

    get thyCollapsed() {
        return this.isCollapsed;
    }

    /**
     * 收起后的宽度
     */
    @Input() @InputNumber() thyCollapsedWidth = 20;

    /**
     * 主题
     * @type white | light | dark
     * @default white
     */
    @Input()
    set thyTheme(value: ThySidebarTheme) {
        if (value === 'light') {
            this.sidebarThemeLight = true;
        } else if (value === 'dark') {
            this.sidebarThemeDark = true;
        }
    }

    /**
     * 默认宽度，双击后可恢复到此宽度，默认是 240px，传入 lg 大小时宽度是300px
     */
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

    isResizable: boolean;

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
        if (this.sidebarPositionRight) {
            this.thyLayoutComponent.isSidebarRight = true;
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
        this.collapseVisible = type === 'enter' && !this.thyCollapsed ? true : false;
    }

    toggleCollapse(event?: MouseEvent) {
        this.thyCollapsed = !this.thyCollapsed;
        setTimeout(() => this.updateCollapseTip(), 200);
        this.thyCollapsedChange.emit(this.isCollapsed);
    }

    public toggleResizable(event: MouseEvent, type: 'enter' | 'leave') {
        this.isResizable = type === 'enter' ? true : false;
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
