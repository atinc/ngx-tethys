import {
    Component, forwardRef, HostBinding, Input, Optional,
    ElementRef, OnInit, HostListener, ContentChildren,
    QueryList, AfterViewInit, Output, EventEmitter,
    TemplateRef, ContentChild, AfterContentInit, ViewChild, Renderer2
} from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyOptionComponent } from './option.component';
import { ThyActionMenuSubItemDirective } from '../action-menu/action-menu.component';
import { ThyPositioningService } from '../positioning/positioning.service';
import { isUndefined } from '../util/helpers';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

export type SelectMode = 'multiple' | '';

export interface OptionValue {
    thyLabelText?: string;
    thyValue?: string;
    thyDisabled?: boolean;
    thyShowOptionCustom?: boolean;
    thySearchKey?: string;
}

const noop = () => {
};

@Component({
    selector: 'thy-custom-select',
    templateUrl: './select-custom.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectCustomComponent),
            multi: true
        },
        UpdateHostClassService
    ]
})
export class ThySelectCustomComponent implements ControlValueAccessor, OnInit, AfterViewInit, AfterContentInit {

    _innerValue: any;

    _selectedOption: ThyOptionComponent;

    _innerValues: any[] = [];

    _selectedOptions: ThyOptionComponent[] = [];

    _disabled = false;

    _size: InputSize;

    _mode: SelectMode;

    _classNames: any = [];

    _viewContentInitialized = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select-custom') _isSelectCustom = true;

    @HostBinding('class.thy-select') _isSelect = true;

    // 菜单是否展开
    @HostBinding('class.menu-is-opened') _expandOptions = false;

    @Output() thyOnSearch: EventEmitter<any> = new EventEmitter<any>();

    @Input() thyShowSearch: boolean;

    @Input() thyPlaceHolder: string;

    @Input() thyServerSearch: boolean;

    @Input() thyShowOptionMenu: boolean;

    @Input()
    set thyMode(value: SelectMode) {
        this._mode = value;
    }

    @Input()
    set thySize(value: InputSize) {
        this._size = value;
    }

    _listOfOptionComponent: QueryList<ThyOptionComponent>;

    @ContentChildren(ThyOptionComponent)
    set listOfOptionComponent(value: QueryList<ThyOptionComponent>) {
        this._listOfOptionComponent = value;
        this._setSelectedOptions();
    }

    @ContentChild('selectedDisplay') selectedValueDisplayRef: TemplateRef<any>;

    @ViewChild('selectMenuSetting') formControlElementRef: ElementRef<any>;

    @ViewChild('selectContainer')
    set selectContainerWrapperElementRef(value: ElementRef<any>) {
        if (value && value.nativeElement) {
            this.autoCalculateMenuPosition(value.nativeElement);
        }
    }

    selectedValueContext: any;

    _setSelectedOptions() {
        if (this._mode === 'multiple') {
            if (this._innerValues && this._innerValues.length > 0) {
                this._selectedOptions = this.findOptionComponents((item) => {
                    return this._innerValues.indexOf(item.thyValue) >= 0;
                });
                this._selectedOptions.forEach((item) => {
                    item.selected = true;
                });
            } else {
                this._selectedOptions = [];
            }

            this.selectedValueContext = {
                $implicit: this._selectedOptions
            };
        } else {
            // allow value is empty
            if (isUndefined(this._innerValue)) {
                this._selectedOption = null;
            } else {
                this._selectedOption = this.findOneOptionComponent((item) => {
                    return item.thyValue === this._innerValue;
                });
            }
            this.selectedValueContext = {
                $implicit: this._selectedOption ? (this._selectedOption.thyRawValue || this._selectedOption.thyValue) : null
            };
        }

    }

    findOneOptionComponent(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent {
        let result: ThyOptionComponent;
        this._listOfOptionComponent.forEach((item) => {
            if (result) {
                return;
            }
            if (item.thyGroupLabel) {
                item.listOfOptionComponent.forEach((subItem) => {
                    if (iterate(subItem)) {
                        result = subItem;
                    }
                });
            } else {
                if (iterate(item)) {
                    result = item;
                }
            }
        });
        return result;
    }

    findOptionComponents(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent[] {
        const result: ThyOptionComponent[] = [];
        this._listOfOptionComponent.forEach((item) => {
            if (item.thyGroupLabel) {
                item.listOfOptionComponent.forEach((subItem) => {
                    if (iterate(subItem)) {
                        result.push(subItem);
                    }
                });
            } else {
                if (iterate(item)) {
                    result.push(item);
                }
            }
        });
        return result;
    }

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
        private thyPositioningService: ThyPositioningService,
        private renderer: Renderer2
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        event.stopPropagation();
        if (!this.elementRef.nativeElement.contains(event.target)) {
            if (this.thyShowOptionMenu) {
                this._expandOptions = true;
            } else {
                this._expandOptions = false;
            }
        }
    }

    ngOnInit() {
        if (this._size) {
            this._classNames.push(`thy-select-${this._size}`);
        }
        if (this._mode === 'multiple') {
            this._classNames.push(`thy-select-custom--multiple`);
        }
        this.updateHostClassService.updateClass(this._classNames);
    }

    ngAfterViewInit(): void {
        // this._viewContentInitialized = true;
        // this._setSelectedOptions();
    }

    ngAfterContentInit(): void {
        this._viewContentInitialized = true;
        this._setSelectedOptions();
    }

    writeValue(value: any): void {
        if (this._mode === 'multiple') {
            this._innerValues = value;
        } else {
            this._innerValue = value;
        }
        if (this._viewContentInitialized) {
            this._setSelectedOptions();
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    valueOnChange(value: any) {
        this.onChangeCallback(value);
    }

    dropDownMenuToggle(event: Event, templateRef: any) {
        this._expandOptions = !this._expandOptions;
    }

    autoCalculateMenuPosition(targetElement: HTMLElement) {
        if (this._expandOptions) {
            const hostElement = this.formControlElementRef.nativeElement;
            const targetElBCR = targetElement.getBoundingClientRect();
            const hostOffset = this.thyPositioningService.offset(hostElement);
            const hostPos = this.thyPositioningService.position(hostElement);
            // 底部空间不够
            if (targetElBCR.top + targetElBCR.height > document.documentElement.clientHeight) {
                // 上方可以放下直接放上方，否则遮盖 form-control
                if (targetElBCR.top - hostPos.height < targetElBCR.height) {
                    targetElement.style.top = `${document.documentElement.clientHeight - targetElBCR.top - targetElBCR.height}px`;
                } else {
                    targetElement.style.bottom = `${(hostPos.height + 4)}px`;
                }
            }
        }
    }

    remove(event: Event, item: ThyOptionComponent, index: number) {
        event.stopPropagation();
        this._selectedOptions.splice(index, 1);
        this._innerValues = this._selectedOptions.map((option) => {
            return option.thyValue;
        });
        item.selected = false;
        if (!this._expandOptions) {
            this._expandOptions = true;
        }
        this.valueOnChange(this._innerValues);
    }

    selectItem(option: ThyOptionComponent) {
        if (this._mode === 'multiple') {
            if (this._selectedOptions.length > 0) {
                const _index = this._selectedOptions.findIndex((item: any) => {
                    return item.thyValue === option.thyValue;
                });
                if (_index === -1) {
                    option.selected = true;
                    this._selectedOptions.push(option);
                } else {
                    option.selected = false;
                    this._selectedOptions.splice(_index, 1);
                }
            } else {
                option.selected = true;
                this._selectedOptions.push(option);
            }
            this._innerValues = this._selectedOptions.map((item) => {
                return item.thyValue;
            });
            this.valueOnChange(this._innerValues);
            this.selectedValueContext = {
                $implicit: this._selectedOptions
            };
        } else {
            this._selectedOption = option;
            this._innerValue = option.thyValue;
            this._expandOptions = false;
            this.valueOnChange(this._innerValue);
            this.selectedValueContext = {
                $implicit: this._selectedOption.thyRawValue || this._selectedOption.thyValue
            };
        }

    }
}
