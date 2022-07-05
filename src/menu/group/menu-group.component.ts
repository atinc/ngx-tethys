import {
    Component,
    OnInit,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    TemplateRef,
    ContentChild,
    ChangeDetectionStrategy
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyMenuComponent, ThyMenuTheme } from '../menu.component';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * 菜单分组组件，支持选择器 thy-menu-group, [thy-menu-group],[thyMenuGroup]
 */
@Component({
    selector: 'thy-menu-group, [thy-menu-group],[thyMenuGroup]',
    templateUrl: './menu-group.component.html',
    animations: [
        trigger('detailsContentAnimation', [
            state(
                'void',
                style({
                    height: '*'
                })
            ),
            state(
                '1',
                style({
                    height: 0,
                    overflow: 'hidden'
                })
            ),
            state(
                '0',
                style({
                    height: '*'
                })
            ),
            transition('* => *', animate('0ms ease-out'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyMenuGroupComponent implements OnInit {
    public _actionMenu: ComponentType<any> | TemplateRef<any>;

    public rightIconClass = 'more';

    public iconClass = 'folder-bold';

    public groupHeaderPaddingLeft = 0;

    @ViewChild('thyMenuGroup', { static: true }) _thyMenuGroup: ElementRef;

    @ContentChild('headerContent')
    headerContentTemplateRef: TemplateRef<any>;

    @HostBinding('class.thy-menu-group') isThyMenuGroup = true;

    @HostBinding('class.has-icon') showIcon = false;

    @HostBinding('class.collapsed') isCollapsed = false;

    /**
     * 分组标题
     */
    @Input() thyTitle = '';

    /**
     * 已废弃，请使用 thyCollapsed
     * @deprecated
     */
    @Input('thyExpand')
    set thyExpand(value: boolean) {
        this.isCollapsed = !!!value;
    }

    /**
     * 是否处于收起状态
     * @default false
     */
    @Input('thyCollapsed')
    @InputBoolean()
    set thyCollapsed(value: boolean) {
        this.isCollapsed = value;
    }

    /**
     * 是否支持展开收起
     * @default false
     */
    @Input() @InputBoolean() thyCollapsible: boolean = false;

    /**
     * 是否显示 Icon
     */
    @Input('thyShowIcon')
    set thyShowIcon(value: boolean) {
        this.showIcon = value;
    }

    /**
     * 图标
     */
    @Input('thyIcon')
    set thyIcon(value: string) {
        this.iconClass = value;
    }

    /**
     * 操作图标
     */
    @Input('thyActionIcon')
    set thyActionIcon(value: string) {
        this.rightIconClass = value;
    }

    /**
     *是否显示操作
     */
    @Input() thyShowAction = false;

    /**
     * 操作阻止冒泡事件
     */
    @Input() thyActionStopPropagation = true;

    /**
     * Action 点击事件
     */
    @Output() thyOnActionClick: EventEmitter<Event> = new EventEmitter<Event>();

    @Output() thyCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * 设置 Action 菜单
     */
    @Input()
    set thyActionMenu(value: ComponentType<any> | TemplateRef<any>) {
        this._actionMenu = value;
    }

    constructor(private popover: ThyPopover, public parent: ThyMenuComponent) {}

    ngOnInit(): void {}

    collapseGroup(): void {
        if (!this.thyCollapsible) {
            return;
        }
        this.isCollapsed = !this.isCollapsed;
        this.thyCollapsedChange.emit(this.isCollapsed);
    }

    onActionClick(event: Event): void {
        if (this.thyActionStopPropagation) {
            event.stopPropagation();
        }
        if (this._actionMenu) {
            this.popover.open(this._actionMenu, {
                origin: event.currentTarget as HTMLElement,
                insideClosable: true,
                placement: 'bottom'
            });
        } else {
            this.thyOnActionClick.emit(event);
        }
    }
}
