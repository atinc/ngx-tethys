import {
    Component,
    Input,
    ElementRef,
    ViewEncapsulation,
    ContentChild,
    ContentChildren,
    TemplateRef,
    ViewChild,
    InjectionToken,
    Optional,
    Inject
} from '@angular/core';
import {
    AfterContentInit,
    OnInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { ThyGridComponent } from './grid.component';
import { ThyGridColumn } from './grid.interface';

export interface IThyGridColumnParentComponent {
    updateColumnSelections(key: string, selections: any): void;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_GRID_COLUMN_PARENT_COMPONENT = new InjectionToken<
    IThyGridColumnParentComponent
>('THY_GRID_COLUMN_PARENT_COMPONENT');

@Component({
    selector: 'thy-grid-column',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyGridColumnComponent implements OnInit {
    @Input() thyModelKey = '';

    @Input() thyTitle = '';

    @Input() thyType = '';

    @Input() thyWidth: string | number = '';

    @Input() thyClassName = '';

    @Input() thyHeaderClassName = '';

    @Input() thyDisabled = false;

    @Input()
    set thySelections(value: any) {
        if (value) {
            if (Array.isArray(value)) {
                this.selections = value;
            } else {
                this.selections = [value];
            }
            if (!this._firstChange) {
                this.parent.updateColumnSelections(this.key, this.selections);
            }
        }
    }

    @Input() thyDefaultText = '';

    @ContentChild('header') headerTemplateRef: TemplateRef<any>;

    @ContentChild('cell') cellTemplateRef: TemplateRef<any>;

    @ContentChild(TemplateRef)
    set templateRef(value: TemplateRef<any>) {
        if (value) {
            if (!this.headerTemplateRef && !this.cellTemplateRef) {
                this.cellTemplateRef = value;
            }
        }
    }

    public key?: string;

    public model: string;

    public title: string;

    public type: string;

    public selections: any = [];

    public width: string | number;

    public className: string;

    public headerClassName: string;

    public disabled: boolean;

    public defaultText: string;

    private _firstChange = true;

    constructor(
        private el: ElementRef,
        @Optional()
        @Inject(THY_GRID_COLUMN_PARENT_COMPONENT)
        public parent: IThyGridColumnParentComponent
    ) {}

    ngOnInit() {
        this.key = this._generateKey();
        this.model = this.thyModelKey;
        this.title = this.thyTitle;
        this.type = this.thyType;
        this.width = this.thyWidth;
        this.className = this.thyClassName;
        this.headerClassName = this.thyHeaderClassName;
        this.disabled = this.thyDisabled;
        this.defaultText = this.thyDefaultText;
        this._firstChange = false;
    }

    private _generateKey() {
        return (
            '[$$column]' +
            Math.random()
                .toString(16)
                .substr(2, 8)
        );
    }
}
