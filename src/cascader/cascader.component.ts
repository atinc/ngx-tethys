import {
    OnInit,
    Component,
    forwardRef,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
    HostListener,
    ViewChild,
    ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    ConnectedOverlayPositionChange,
    ConnectionPositionPair
} from '@angular/cdk/overlay';
import { DEFAULT_DROPDOWN_POSITIONS } from '../core/overlay/overlay-opsition-map';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { inputValueToBoolean } from '../util/helpers';

function toArray<T>(value: T | T[]): T[] {
    let ret: T[];
    if (value == null) {
        ret = [];
    } else if (!Array.isArray(value)) {
        ret = [value];
    } else {
        ret = value;
    }
    return ret;
}

function arrayEquals<T>(array1: T[], array2: T[]): boolean {
    if (!array1 || !array2 || array1.length !== array2.length) {
        return false;
    }

    const len = array1.length;
    for (let i = 0; i < len; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

const defaultDisplayRender = (label: any) => label.join(' / ');

export type ThyCascaderSize = 'xs' | 'sm' | 'md' | 'lg' | '';
export type ThyCascaderTriggerType = 'click' | 'hover';
export type ThyCascaderExpandTrigger = 'click' | 'hover';

export interface CascaderOption {
    value?: any;
    label?: string;
    title?: string;
    disabled?: boolean;
    loading?: boolean;
    isLeaf?: boolean;
    parent?: CascaderOption;
    children?: CascaderOption[];

    [key: string]: any;
}

@Component({
    selector: 'thy-cascader,[thy-cascader]',
    templateUrl: './cascader.component.html',
    providers: [
        UpdateHostClassService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCascaderComponent),
            multi: true
        }
    ],
    styles: [
        `
            .thy-cascader-menus {
                margin-top: 4px;
                margin-bottom: 4px;
                top: 100%;
                left: 0;
                position: relative;
                width: 100%;
            }
        `
    ]
})
export class ThyCascaderComponent implements OnInit, ControlValueAccessor {
    private changeOnSelect = false;
    private showInput = true;
    private prefixCls = 'thy-cascader';
    private menuClassName: string;
    private columnClassName: string;
    private _menuColumnCls: any;
    private defaultValue: any[];

    public dropDownPosition = 'bottom';
    public menuVisible = false;
    public isLoading = false;
    public isOpening = false;
    public showSearch = false;

    private _arrowCls: { [name: string]: any };
    private _menuCls: { [name: string]: any };
    private _labelCls: { [name: string]: any };
    private _clearCls: { [name: string]: any };

    private labelRenderTpl: TemplateRef<any>;
    public isLabelRenderTemplate = false;
    public labelRenderText: string;
    public labelRenderContext: any = {};

    // ngModel Access
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;
    positions: ConnectionPositionPair[] = [...DEFAULT_DROPDOWN_POSITIONS];

    @Input()
    set thyLabelRender(value: TemplateRef<any>) {
        this.labelRenderTpl = value;
        this.isLabelRenderTemplate = value instanceof TemplateRef;
    }

    get thyLabelRender(): TemplateRef<any> {
        return this.labelRenderTpl;
    }

    private value: any[];
    private selectedOptions: CascaderOption[] = [];
    private activatedOptions: CascaderOption[] = [];
    // 表示当前菜单的数据列：all data columns
    public thyColumns: CascaderOption[][] = [];

    @Input() thyValueProperty = 'value';

    @Input() thyLabelProperty = 'label';

    @Input() thyPlaceHolder = '请选择';

    private _inputValue = '';

    get inputValue(): string {
        return this._inputValue;
    }

    set inputValue(inputValue: string) {
        this._inputValue = inputValue;
        const willBeInSearch = !!inputValue;
    }

    @Input() thyLoadData: (
        node: CascaderOption,
        index?: number
    ) => PromiseLike<any>;

    @Input()
    set thyChangeOnSelect(value: boolean) {
        this.changeOnSelect = inputValueToBoolean(value);
    }

    get thyChangeOnSelect(): boolean {
        return this.changeOnSelect;
    }

    @Input()
    set thyShowInput(value: boolean) {
        this.showInput = inputValueToBoolean(value);
    }

    get thyShowInput(): boolean {
        return this.showInput;
    }

    public searchWidthStyle: string;
    private oldColumnsHolder: any;
    private oldActivatedOptions: any;

    public inSearch = false;

    @Input() thyTriggerAction:
        | ThyCascaderTriggerType
        | ThyCascaderTriggerType[] = ['click'];

    @Input() thyMenuStyle: { [key: string]: string };

    @Input()
    set thyOptions(options: CascaderOption[] | null) {
        this.oldColumnsHolder = this.thyColumns =
            options && options.length ? [options] : [];
        if (!this.inSearch) {
            if (this.defaultValue && this.thyColumns.length) {
                this.initOptions(0);
            }
        }
    }

    /** Whether can search. Defaults to `false`. */
    // @Input()
    // set thyShowSearch(value: boolean) {
    //     this.showSearch = value;
    // }

    // get thyShowSearch(): boolean {
    //     return this.showSearch;
    // }

    @Input()
    disabled = false;

    @Output() thyChange = new EventEmitter<any[]>();

    @Output() thySelectionChange = new EventEmitter<CascaderOption[]>();

    @Output() thySelect = new EventEmitter<{
        option: CascaderOption;
        index: number;
    }>();

    @Output() thyClear = new EventEmitter<void>();

    @ViewChild('input') input: ElementRef;
    /** 浮层菜单 */
    @ViewChild('menu') menu: ElementRef;

    public onPositionChange(position: ConnectedOverlayPositionChange): void {
        const newValue =
            position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
        if (this.dropDownPosition !== newValue) {
            this.dropDownPosition = newValue;
            this.cdr.detectChanges();
        }
    }

    private setClassMap(): void {
        const classMap = {
            [`${this.prefixCls}`]: true,
            [`${this.prefixCls}-picker`]: true,
            //   [ `${this.prefixCls}-picker-disabled` ]  : this.disabled,
            //   [ `${this.prefixCls}-focused` ]          : this.isFocused,
            [`${this.prefixCls}-picker-open`]: this.menuVisible
            //   [ `${this.prefixCls}-picker-with-value` ]: this.inputValue && this.inputValue.length
        };
        this.updateHostClassService.updateClassByMap(classMap);
    }

    ngOnInit(): void {
        this.setClassMap();
        this.setMenuClass();
        this.setMenuColumnClass();
        this.setArrowClass();
        this.setLabelClass();
        this.setClearClass();
    }

    public get menuCls(): any {
        return this._menuCls;
    }

    @Input()
    set thyMenuClassName(value: string) {
        this.menuClassName = value;
        this.setMenuClass();
    }

    get thyMenuClassName(): string {
        return this.menuClassName;
    }

    @Input()
    set thyColumnClassName(value: string) {
        this.columnClassName = value;
        this.setMenuClass();
    }

    get thyColumnClassName(): string {
        return this.columnClassName;
    }

    private setMenuClass(): void {
        this._menuCls = {
            [`${this.prefixCls}-menus`]: true,
            [`${this.prefixCls}-menus-hidden`]: !this.menuVisible,
            [`${this.thyMenuClassName}`]: this.thyMenuClassName
        };
    }

    public get menuColumnCls(): any {
        return this._menuColumnCls;
    }

    private setMenuColumnClass(): void {
        this._menuColumnCls = {
            [`${this.prefixCls}-menu`]: true,
            [`${this.thyColumnClassName}`]: this.thyColumnClassName
        };
    }

    /** 获取列中Option的样式 */
    public getOptionCls(option: CascaderOption, index: number): any {
        return {
            [`${this.prefixCls}-menu-item`]: true,
            [`${this.prefixCls}-menu-item-expand`]: !option.isLeaf,
            [`${this.prefixCls}-menu-item-active`]: this.isActivedOption(
                option,
                index
            ),
            [`${this.prefixCls}-menu-item-disabled`]: option.disabled
        };
    }

    @HostListener('click', [ '$event' ])
    public trggleClick($event: Event) {
        if (this.disabled) {
            return;
        }
        this.onTouched();
        if (this.isClickTriggerAction()) {
            this.setMenuVisible(!this.menuVisible);
        }

        // if (this.showSearch) {
        //     this.focus();
        // }
    }

    public focus() {
    }

    private isClickTriggerAction(): boolean {
        if (typeof this.thyTriggerAction === 'string') {
            return this.thyTriggerAction === 'click';
        }
        return this.thyTriggerAction.indexOf('click') !== -1;
    }

    public closeMenu(): void {
        // this.blur();
        // this.clearDelayTimer();
        this.setMenuVisible(false);
        this.setArrowClass();
    }

    public getOptionLabel(option: CascaderOption): any {
        return option[this.thyLabelProperty || 'label'];
    }

    public getOptionValue(option: CascaderOption): any {
        return option[this.thyValueProperty || 'value'];
    }

    private isActivedOption(option: CascaderOption, index: number): boolean {
        const activeOpt = this.activatedOptions[index];
        return activeOpt === option;
    }

    private findOption(option: any, index: number): CascaderOption {
        const options: CascaderOption[] = this.thyColumns[index];
        if (options) {
            const value =
                typeof option === 'object'
                    ? this.getOptionValue(option)
                    : option;
            return options.find(o => value === this.getOptionValue(o));
        }
        return null;
    }

    private setColumnData(options: CascaderOption[], index: number): void {
        if (!arrayEquals(this.thyColumns[index], options)) {
            this.thyColumns[index] = options;
            if (index < this.thyColumns.length - 1) {
                this.thyColumns = this.thyColumns.slice(0, index + 1);
            }
        }
    }

    onOptionClick(option: CascaderOption, index: number, event: Event): void {
        if (event) {
            event.preventDefault();
        }
        // this.el.focus();

        if (option && option.disabled) {
            return;
        }

        // if(this.inS)
        this.setActiveOption(option, index, true);
    }

    private setActiveOption(
        option: CascaderOption,
        index: number,
        select: boolean,
        loadChildren: boolean = true
    ): void {
        if (!option || option.disabled) {
            return;
        }
        this.activatedOptions[index] = option;
        for (let i = index - 1; i >= 0; i--) {
            if (!this.activatedOptions[i]) {
                this.activatedOptions[i] = this.activatedOptions[i + 1].parent;
            }
        }
        if (index < this.activatedOptions.length - 1) {
            this.activatedOptions = this.activatedOptions.slice(0, index + 1);
        }

        if (option.children && option.children.length) {
            option.isLeaf = false;
            option.children.forEach(child => (child.parent = option));
            this.setColumnData(option.children, index + 1);
        } else if (!option.isLeaf && loadChildren) {
            this.loadChildren(option, index);
        } else {
            if (index < this.thyColumns.length - 1) {
                this.thyColumns = this.thyColumns.slice(0, index + 1);
            }
        }

        if (select) {
            this.onSelectOption(option, index);
        }
    }

    private loadChildren(
        option: CascaderOption,
        index: number,
        success?: () => void,
        failure?: () => void
    ): void {
        if (this.thyLoadData) {
            this.isLoading = true;
            this.thyLoadData(option, index).then(
                () => {
                    option.loading = this.isLoading = false;
                    if (option.children) {
                        option.children.forEach(
                            child =>
                                (child.parent = index < 0 ? undefined : option)
                        );
                        this.setColumnData(option.children, index + 1);
                    }
                    if (success) {
                        success();
                    }
                },
                () => {
                    option.loading = this.isLoading = false;
                    option.isLeaf = true;
                    if (failure) {
                        failure();
                    }
                }
            );
        }
    }

    private onSelectOption(option: CascaderOption, index: number): void {
        this.thySelect.emit({ option, index });

        if (
            option.isLeaf ||
            this.changeOnSelect ||
            this.isChangeOn(option, index)
        ) {
            this.selectedOptions = this.activatedOptions;
            this.buildDisplayLabel();
            this.onValueChange();
        }

        if (option.isLeaf) {
            this.setMenuVisible(false);
        }
    }

    public getSubmitValue(): any[] {
        const values: any[] = [];
        this.selectedOptions.forEach(option => {
            values.push(this.getOptionValue(option));
        });
        return values;
    }

    private onValueChange(): void {
        const value = this.getSubmitValue();
        if (!arrayEquals(this.value, value)) {
            this.defaultValue = null;
            this.value = value;
            this.onChange(value);
            if (value.length === 0) {
                this.thyClear.emit();
            }
            this.thySelectionChange.emit(this.selectedOptions);
            this.thyChange.emit(value);
        }
    }

    constructor(
        private cdr: ChangeDetectorRef,
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService
    ) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    private buildDisplayLabel(): void {
        const selectedOptions = this.selectedOptions;
        const labels: string[] = selectedOptions.map(o =>
            this.getOptionLabel(o)
        );

        if (this.isLabelRenderTemplate) {
            this.labelRenderContext = { labels, selectedOptions };
        } else {
            this.labelRenderText = defaultDisplayRender.call(
                this,
                labels,
                selectedOptions
            );
        }
    }

    /**
     * 显示或者隐藏菜单
     *
     * @param visible true-显示，false-隐藏
     * @param delay 延迟时间
     */
    public delaySetMenuVisible(
        visible: boolean,
        delay: number,
        setOpening: boolean = false
    ): void {
        // this.clearDelayTimer();
        if (delay) {
            if (visible && setOpening) {
                this.isOpening = true;
            }
            // this.delayTimer = setTimeout(() => {
            //     this.setMenuVisible(visible);
            //     this.clearDelayTimer();
            //     if (visible) {
            //         setTimeout(() => {
            //             this.isOpening = false;
            //         }, 100);
            //     }
            // }, delay);
        } else {
            this.setMenuVisible(visible);
        }
    }

    public isMenuVisible(): boolean {
        return this.menuVisible;
    }

    public setMenuVisible(menuVisible: boolean): void {
        if (this.menuVisible !== menuVisible) {
            this.menuVisible = menuVisible;

            // update class
            this.setClassMap();
            this.setArrowClass();
            this.setMenuClass();
            if (menuVisible) {
                // this.beforeVisible();
            }
            // this.thyVisibleChange.emit(menuVisible);
        }
    }

    /** 箭头 样式 */
    public get arrowCls(): any {
        return this._arrowCls;
    }

    private setArrowClass(): void {
        this._arrowCls = {
            [`${this.prefixCls}-picker-arrow`]: true,
            [`${this.prefixCls}-picker-arrow-expand`]: this.menuVisible
        };
    }

    public get clearCls(): any {
        return this._clearCls;
    }

    private setClearClass(): void {
        this._clearCls = {
            [`${this.prefixCls}-picker-clear`]: true
        };
    }

    public clearSelection($event: Event): void {
        if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }

        this.labelRenderText = '';
        // this.isLabelRenderTemplate = false;
        // clear custom context
        this.labelRenderContext = {};
        this.selectedOptions = [];
        this.activatedOptions = [];
        this.inputValue = '';
        this.setMenuVisible(false);

        // trigger change event
        this.onValueChange();
    }

    private hasInput(): boolean {
        return this.inputValue.length > 0;
    }

    private hasValue(): boolean {
        return this.value && this.value.length > 0;
    }

    public get showPlaceholder(): boolean {
        return !(this.hasInput() || this.hasValue());
    }

    /** 标签 样式 */
    public get labelCls(): any {
        return this._labelCls;
    }

    private setLabelClass(): void {
        this._labelCls = {
            [`${this.prefixCls}-picker-label`]: true,
            [`${this.prefixCls}-show-search`]: false,
            [`${this.prefixCls}-focused`]: false
        };
    }

    // @HostListener('click', ['$event'])
    // public onTriggerClick(event: MouseEvent): void {
    //     this.onTouched();
    //     if (this.isClickTriggerAction()) {
    //         // this.delaySetMenuVisible(!this.menuVisible, 100);
    //         this.delaySetMenuVisible(!this.menuVisible, 0);
    //     }
    // }

    @HostListener('mouseleave', ['$event'])
    public onTriggerMouseLeave(event: MouseEvent): void {
        return;
    }

    private isChangeOn(option: CascaderOption, index: number): boolean {
        return false;
    }

    private activateOnInit(index: number, value: any): void {
        let option = this.findOption(value, index);
        if (!option) {
            option =
                typeof value === 'object'
                    ? value
                    : {
                          [`${this.thyValueProperty || 'value'}`]: value,
                          [`${this.thyLabelProperty || 'label'}`]: value
                      };
        }
        this.setActiveOption(option, index, false, false);
    }

    private isLoaded(index: number): boolean {
        return this.thyColumns[index] && this.thyColumns[index].length > 0;
    }

    private initOptions(index: number) {
        const vs = this.defaultValue;
        const load = () => {
            this.activateOnInit(index, vs[index]);
            if (index < vs.length - 1) {
                this.initOptions(index + 1);
            }
            if (index === vs.length - 1) {
                this.afterWriteValue();
            }
        };

        if (this.isLoaded(index) || !this.thyLoadData) {
            load();
        } else {
            const node = this.activatedOptions[index - 1] || {};
            this.loadChildren(node, index - 1, load, this.afterWriteValue);
        }
    }

    afterWriteValue(): void {
        this.selectedOptions = this.activatedOptions;
        this.value = this.getSubmitValue();
        this.buildDisplayLabel();
    }

    writeValue(value: any): void {
        const vs = (this.defaultValue = toArray(value));
        if (vs.length) {
            this.initOptions(0);
        } else {
            this.value = vs;
            this.activatedOptions = [];
            this.afterWriteValue();
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
}
