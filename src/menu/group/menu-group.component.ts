import { ComponentType } from '@angular/cdk/portal';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ModelSignal,
    OnInit,
    TemplateRef,
    contentChild,
    inject,
    input,
    model,
    output,
    viewChild,
    computed
} from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyPopover } from 'ngx-tethys/popover';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyAnimationCollapseDirective } from 'ngx-tethys/core';
import { ThyMenu } from '../menu.component';

/**
 * 菜单分组组件
 * @name thy-menu-group,[thy-menu-group],[thyMenuGroup]
 * @order 30
 */
@Component({
    selector: 'thy-menu-group,[thy-menu-group],[thyMenuGroup]',
    templateUrl: './menu-group.component.html',
    host: {
        '[class.thy-menu-group]': 'true',
        '[class.collapsed]': 'thyCollapsed()',
        '[class.has-icon]': 'thyShowIcon()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, NgTemplateOutlet, ThyIcon, ThyAnimationCollapseDirective]
})
export class ThyMenuGroup implements OnInit {
    private popover = inject(ThyPopover);

    protected parent = inject(ThyMenu, { optional: true });

    public groupHeaderPaddingLeft = 0;

    readonly _thyMenuGroup = viewChild<ElementRef>('thyMenuGroup');

    readonly headerContentTemplateRef = contentChild<TemplateRef<any>>('headerContent');

    /**
     * 分组标题
     */
    readonly thyTitle = input<string>('');

    /**
     * 是否处于收起状态
     */
    readonly thyCollapsed: ModelSignal<boolean> = model(false);

    /**
     * 是否支持展开收起
     */
    readonly thyCollapsible = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否显示 Icon
     */
    readonly thyShowIcon = input(false, { transform: coerceBooleanProperty });

    /**
     * 图标
     */
    readonly thyIcon = input<string, string>('folder-bold', {
        transform: (value: string) => value || 'folder-bold'
    });

    /**
     * 操作图标
     */
    readonly thyActionIcon = input<string, string>('more', {
        transform: (value: string) => value || 'more'
    });

    /**
     *是否显示操作
     */
    readonly thyShowAction = input(false, { transform: coerceBooleanProperty });

    /**
     * 操作阻止冒泡事件
     */
    readonly thyActionStopPropagation = input(true, { transform: coerceBooleanProperty });

    /**
     * Action 点击事件
     */
    readonly thyOnActionClick = output<Event>();

    readonly thyCollapsedChange = output<boolean>();

    /**
     * 设置 Action 菜单
     */
    readonly thyActionMenu = input<ComponentType<any> | TemplateRef<any>>();

    readonly isOpen = computed(() => !this.thyCollapsed() && !this.parent?.thyCollapsed());

    constructor() {}

    ngOnInit(): void {}

    collapseGroup(): void {
        if (!this.thyCollapsible()) {
            return;
        }
        this.thyCollapsed.set(!this.thyCollapsed());
        this.thyCollapsedChange.emit(this.thyCollapsed());
    }

    onActionClick(event: Event): void {
        if (this.thyActionStopPropagation()) {
            event.stopPropagation();
        }
        if (this.thyActionMenu()) {
            this.popover.open(this.thyActionMenu()!, {
                origin: event.currentTarget as HTMLElement,
                insideClosable: true,
                placement: 'bottom'
            });
        } else {
            this.thyOnActionClick.emit(event);
        }
    }
}
