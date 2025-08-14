import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    Component,
    Directive,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    Signal,
    TemplateRef,
    inject,
    numberAttribute,
    input,
    linkedSignal,
    effect,
    computed,
    signal,
    output
} from '@angular/core';
import { ThyHotkeyDispatcher } from '@tethys/cdk/hotkey';
import { isMacPlatform } from '@tethys/cdk/is';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandle } from 'ngx-tethys/resizable';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { Subscription } from 'rxjs';
import { ThyLayoutDirective } from './layout.component';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';
import { injectLocale, ThyLayoutLocale } from 'ngx-tethys/i18n';

const LG_WIDTH = 300;
const SIDEBAR_DEFAULT_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 20;

export type ThySidebarTheme = 'white' | 'light' | 'dark';

export type ThySidebarDirection = 'left' | 'right';

/**
 * 侧边栏布局指令
 * @name thySidebar
 * @order 20
 */
@Directive({
    selector: '[thySidebar]',
    host: {
        class: 'thy-layout-sidebar',
        '[class.thy-layout-sidebar-right]': 'thyDirection() === "right"',
        '[class.thy-layout-sidebar--clear-border-right]': 'thyDirection() === "left" && !thyDivided()',
        '[class.thy-layout-sidebar--clear-border-left]': 'thyDirection() === "right" && !thyDivided()',
        '[class.sidebar-theme-light]': 'thyTheme() === "light"',
        '[class.sidebar-theme-dark]': 'thyTheme() === "dark"',
        '[class.thy-layout-sidebar-isolated]': 'thyIsolated()',
        '[style.width.px]': 'sidebarWidth()'
    }
})
export class ThySidebarDirective implements OnInit {
    private thyLayoutDirective = inject(ThyLayoutDirective, { optional: true, host: true })!;

    /**
     * sidebar 位置，默认在左侧
     */
    readonly thyDirection = input<ThySidebarDirection>('left');

    /**
     * 主题
     * @type white | light | dark
     * @default white
     */
    readonly thyTheme = input<ThySidebarTheme>(undefined);

    /**
     * 宽度，默认是 240px，传入 `lg` 大小时宽度是300px
     * @default 240px
     */
    readonly thyWidth = input(SIDEBAR_DEFAULT_WIDTH, {
        transform: (value: string | number) => {
            if (value === 'lg') {
                return LG_WIDTH;
            }
            return value || SIDEBAR_DEFAULT_WIDTH;
        }
    });

    readonly sidebarWidth = linkedSignal(() => {
        return this.thyWidth() as number;
    });

    /**
     * 是否和右侧 /左侧隔离，当为 true 时距右侧 /左侧会有 margin，同时边框会去掉
     * @default false
     */
    readonly thyIsolated = input(false, { transform: coerceBooleanProperty });

    /**
     * sidebar 是否有分割线。当`thyDirection`值为`left`时，控制右侧是否有分割线；当`thyDirection`值为`right`时，控制左侧是否有分割线。
     * @default true
     */
    readonly thyDivided = input(true, { transform: coerceBooleanProperty });

    ngOnInit() {
        if (this.thyLayoutDirective) {
            this.thyLayoutDirective.sidebarDirection.set(this.thyDirection());
        }
    }
}

/**
 * 侧边栏布局组件
 * @name thy-sidebar
 * @order 21
 */
@Component({
    selector: 'thy-sidebar',
    preserveWhitespaces: false,
    template: `
        <ng-content></ng-content>
        @if (thyDraggable()) {
            <div
                thyResizable
                class="sidebar-drag"
                thyBounds="window"
                [thyMaxWidth]="thyDragMaxWidth()"
                [thyMinWidth]="dragMinWidth()"
                (thyResize)="resizeHandler($event)"
                (thyResizeStart)="resizeStart()"
                (thyResizeEnd)="resizeEnd()"
                [style.display]="!isResizable() ? 'contents' : null">
                @if (!collapsed()) {
                    <thy-resize-handle
                        [thyDirection]="sidebarDirective.thyDirection() === 'right' ? 'left' : 'right'"
                        class="sidebar-resize-handle"
                        thyLine="true"
                        (mouseenter)="toggleResizable($event, 'enter')"
                        (mouseleave)="toggleResizable($event, 'leave')"
                        (dblclick)="restoreToDefaultWidth()">
                    </thy-resize-handle>
                }
            </div>
        }
        @if (thyCollapsible()) {
            <div class="sidebar-collapse-line"></div>

            @if (thyTrigger() !== null) {
                <div
                    class="sidebar-collapse"
                    [ngClass]="{ 'collapse-visible': collapseVisible(), 'collapse-hidden': collapseHidden() }"
                    (click)="toggleCollapse($event)"
                    [thyTooltip]="!thyTrigger() && collapseTip()">
                    <ng-template [ngTemplateOutlet]="thyTrigger() || defaultTrigger"></ng-template>
                    <ng-template #defaultTrigger>
                        <thy-icon class="sidebar-collapse-icon" [thyIconName]="this.collapsed ? 'indent' : 'outdent'"></thy-icon>
                    </ng-template>
                </div>
            }
        }
    `,
    hostDirectives: [
        {
            directive: ThySidebarDirective,
            inputs: ['thyTheme', 'thyDirection', 'thyWidth', 'thyIsolated', 'thyDivided']
        }
    ],
    imports: [NgTemplateOutlet, ThyResizeHandle, ThyResizableDirective, ThyIcon, ThyTooltipDirective, NgClass],
    host: {
        '[class.sidebar-collapse-show]': 'collapsed()',
        '[class.remove-transition]': 'isRemoveTransition()',
        '[style.width.px]': 'sidebarWidth()'
    }
})
export class ThySidebar implements OnInit, OnDestroy {
    private locale: Signal<ThyLayoutLocale> = injectLocale('layout');

    readonly elementRef = inject(ElementRef);

    private hotkeyDispatcher = inject(ThyHotkeyDispatcher);

    public readonly sidebarDirective = inject(ThySidebarDirective);

    protected readonly isMouseEnter = signal(false);

    protected readonly sidebarWidth = computed(() => {
        if (this.thyCollapsible() && this.collapsed()) {
            return this.thyCollapsedWidth();
        } else {
            return this.sidebarDirective.sidebarWidth();
        }
    });

    @HostListener('mouseenter', ['$event'])
    mouseenter($event: MouseEvent) {
        this.isMouseEnter.set(true);
    }

    @HostListener('mouseleave', ['$event'])
    mouseleave($event: MouseEvent) {
        this.isMouseEnter.set(false);
    }

    /**
     * 宽度是否可以拖拽
     * @default false
     */
    readonly thyDraggable = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 拖拽的最大宽度
     */
    readonly thyDragMaxWidth = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 拖拽的最小宽度
     */
    readonly thyDragMinWidth = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 展示收起的触发器自定义模板，默认显示展开收起的圆形图标，设置为 null 表示不展示触发元素，手动控制展开收起状态
     * @type null | undefined | TemplateRef<any>
     * @default undefined
     */
    readonly thyTrigger = input<null | undefined | TemplateRef<any>>(undefined);

    /**
     * 收起状态改变后的事件
     */
    readonly thyCollapsedChange = output<boolean>();

    /**
     * 拖拽宽度的修改事件
     */
    readonly thyDragWidthChange = output<number>();

    /**
     * 开启收起/展开功能
     * @default false
     */
    readonly thyCollapsible = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否是收起
     * @default false
     */
    readonly thyCollapsed = input(false, { transform: coerceBooleanProperty });

    readonly collapsed = linkedSignal(() => this.thyCollapsed());

    readonly collapseVisible = computed(() => {
        return this.isMouseEnter() && !this.collapsed() ? true : false;
    });
    /**
     * 收起后的宽度
     */
    readonly thyCollapsedWidth = input(SIDEBAR_COLLAPSED_WIDTH, { transform: numberAttribute });

    /**
     * 默认宽度，双击后可恢复到此宽度，默认是 240px，传入 lg 大小时宽度是300px
     */
    readonly thyDefaultWidth = input(undefined, {
        transform: (value: string | number) => {
            if (value === 'lg') {
                return LG_WIDTH;
            }
            return value;
        }
    });

    readonly collapseTip = computed(() => {
        const collapseTip = this.collapsed() ? this.locale().expand : this.locale().collapse;
        return collapseTip + (isMacPlatform() ? `（⌘ + /)` : `（Ctrl + /)`);
    });

    private originWidth: number = SIDEBAR_DEFAULT_WIDTH;

    readonly collapseHidden = signal(false);

    readonly isRemoveTransition = signal(false);

    readonly isResizable = signal(false);

    protected dragMinWidth = computed(() => {
        return this.thyDragMinWidth() || this.thyCollapsedWidth();
    });

    private hotkeySubscription: Subscription;

    constructor() {
        effect(() => {
            const collapsible = this.thyCollapsible();
            if (collapsible) {
                this.subscribeHotkeyEvent();
            } else {
                this.hotkeySubscription?.unsubscribe();
            }
        });
    }

    ngOnInit() {}

    private subscribeHotkeyEvent() {
        this.hotkeySubscription = this.hotkeyDispatcher.keydown(['Control+/', 'Meta+/']).subscribe(() => {
            this.toggleCollapse();
        });
    }

    resizeHandler({ width }: ThyResizeEvent) {
        if (width === this.sidebarDirective.sidebarWidth()) {
            return;
        }
        if (this.thyCollapsible() && width < this.thyCollapsedWidth()) {
            return;
        }
        if (this.thyCollapsible() && width === this.thyCollapsedWidth()) {
            this.collapsed.set(true);
            this.thyCollapsedChange.emit(this.collapsed());
            this.sidebarDirective.sidebarWidth.set(this.originWidth);
            this.isMouseEnter.set(false);
            return;
        }
        this.sidebarDirective.sidebarWidth.set(width);
        this.thyDragWidthChange.emit(width);
    }

    resizeStart() {
        this.originWidth = this.sidebarDirective.sidebarWidth();
        this.collapseHidden.set(true);
        this.isRemoveTransition.set(true);
    }

    resizeEnd() {
        this.collapseHidden.set(false);
        this.isRemoveTransition.set(false);
    }

    toggleCollapse(event?: MouseEvent) {
        this.collapsed.update((value: boolean) => {
            return !value;
        });
        this.thyCollapsedChange.emit(this.collapsed());
    }

    public toggleResizable(event: MouseEvent, type: 'enter' | 'leave') {
        this.isResizable.set(type === 'enter' ? true : false);
    }

    restoreToDefaultWidth() {
        const thyDefaultWidth = this.thyDefaultWidth();
        this.sidebarDirective.sidebarWidth.set((thyDefaultWidth as number) || SIDEBAR_DEFAULT_WIDTH);
        this.thyDragWidthChange.emit(this.sidebarDirective.sidebarWidth());
    }

    ngOnDestroy(): void {
        this.hotkeySubscription?.unsubscribe();
    }
}
