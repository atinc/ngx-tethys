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

@Component({
    selector: 'thy-table-column',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ThyTableColumnComponent implements OnInit {
    @Input('thyModelKey') model = '';

    @Input('thyTitle') title = '';

    @Input('thyType') type = '';

    public width: string = '';
    @Input()
    set thyWidth(value: string | number) {
        this.width = coerceCssPixelValue(value);
    }

    public minWidth: string = '';
    @Input()
    set thyMinWidth(value: string | number) {
        this.minWidth = coerceCssPixelValue(value);
    }

    @Input('thyClassName') className = '';

    @Input('thyHeaderClassName') headerClassName = '';

    @Input('thyDisabled') disabled = false;

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

    @Input('thyDefaultText') defaultText = '';

    @Input('thyExpand') expand = false;

    public sortable: boolean;
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

    @Input('thySortDirection') sortDirection = ThyTableSortDirection.default;

    @Input('thyFixed') fixed: FixedDirection;

    @Input('thyOperational') @InputBoolean() operational: boolean | string;

    @Input('thySecondary') @InputBoolean() secondary: boolean | string;

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
