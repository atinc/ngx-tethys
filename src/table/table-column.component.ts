import { _isNumberValue } from '@angular/cdk/coercion';
import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { coerceCssPixelValue, isArray, isObject } from 'ngx-tethys/util';
import { ThyTableSortDirection, ThyTableSortEvent } from './table.interface';

export interface IThyTableColumnParentComponent {
    rowKey: string;
    updateColumnSelections(key: string, selections: any): void;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_TABLE_COLUMN_PARENT_COMPONENT = new InjectionToken<IThyTableColumnParentComponent>('THY_TABLE_COLUMN_PARENT_COMPONENT');

export type FixedDirection = 'left' | 'right';

/**
 * 表格列组件
 */
@Component({
    selector: 'thy-table-column',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ThyTableColumnComponent implements OnInit {
    /**
     * 设置数据属性 Key，读取数组中对象的当前 Key 值
     */
    @Input('thyModelKey') model = '';

    /**
     * 设置列名，显示在表头
     */
    @Input('thyTitle') title = '';

    /**
     * 设置列的特殊类型，序列号、选择框、单选框、切换按钮
     */
    @Input('thyType') type = '';

    public width: string = '';

    /**
     * 设置列的宽度
     */
    @Input()
    set thyWidth(value: string | number) {
        this.width = coerceCssPixelValue(value);
    }

    public minWidth: string = '';

    /**
     * 设置列的最小宽度
     */
    @Input()
    set thyMinWidth(value: string | number) {
        this.minWidth = coerceCssPixelValue(value);
    }

    /**
     * 设置列的样式
     */
    @Input('thyClassName') className = '';

    /**
     * 设置列头部的 Class，即 th 元素上的样式
     */
    @Input('thyHeaderClassName') headerClassName = '';

    /**
     * 设置自定义类型的禁用状态
     * @default false
     */
    @Input('thyDisabled') disabled = false;

    /**
     * thyType 为 checkbox 或者 radio 类型时选中的数据 ，支持单个对象，单个 Id，同时支持多个 Id，多个对象
     */
    @Input('thySelections')
    set selections(value: any) {
        if (value) {
            this._selections = isArray(value) ? value : [value];
            this._selections = this._selections.map((item: string | number | object) => {
                return isObject(item) ? item[this.parent.rowKey] : item;
            });
            if (!this._firstChange) {
                this.parent.updateColumnSelections(this.key, this._selections);
            }
        }
    }

    get selections() {
        return this._selections;
    }
    /**
     * 设置数据为空的时候显示的文本
     */
    @Input('thyDefaultText') defaultText = '';

    /**
     * 设置 Tree 模式下折叠展开按钮展示列，不传默认第一列
     * @default false
     */
    @Input('thyExpand') expand = false;

    public sortable: boolean;

    /**
     * 是否开启列排序功能（开启时 thyModelKey 为 必传）
     * @default false
     */
    @Input()
    set thySortable(value: boolean) {
        if (value) {
            if (this.model) {
                this.sortable = true;
            } else {
                throw new Error(`thyModelKey is required when sortable`);
            }
        } else {
            this.sortable = false;
        }
    }

    /**
     * 默认列排序顺序
     * @type 'asc' | 'desc' | ''
     * @default default
     */
    @Input('thySortDirection') sortDirection = ThyTableSortDirection.default;

    /**
     * 设置固定列
     */
    @Input('thyFixed') fixed: FixedDirection;

    /**
     * 当前列是否是操作列，设置为 true 时会追加 thy-operation-links 样式类，文字居中
     * @default false
     */
    @Input('thyOperational') @InputBoolean() operational: boolean | string;

    /**
     * 当前列是否是次要列，设置为 true 时会追加 thy-table-column-secondary 样式类，文字颜色为 $gray-600
     * @default false
     */
    @Input('thySecondary') @InputBoolean() secondary: boolean | string;

    /**
     * 列排序修改事件
     */
    @Output('thySortChange') sortChange: EventEmitter<ThyTableSortEvent> = new EventEmitter<ThyTableSortEvent>();

    @ContentChild('header', { static: true }) headerTemplateRef: TemplateRef<any>;

    @ContentChild('cell', { static: true }) cellTemplateRef: TemplateRef<any>;

    @ContentChild(TemplateRef, { static: true })
    set templateRef(value: TemplateRef<any>) {
        if (value) {
            if (!this.headerTemplateRef && !this.cellTemplateRef) {
                this.cellTemplateRef = value;
            }
        }
    }

    public key?: string;

    public left: number;

    public right: number;

    private _selections: any;

    private _firstChange = true;

    constructor(
        private el: ElementRef,
        @Optional()
        @Inject(THY_TABLE_COLUMN_PARENT_COMPONENT)
        public parent: IThyTableColumnParentComponent
    ) {}

    ngOnInit() {
        this.key = this._generateKey();
        this._firstChange = false;
    }

    private _generateKey() {
        return (
            '[$$column]' +
            Math.random()
                .toString(16)
                .slice(2, 10)
        );
    }
}
