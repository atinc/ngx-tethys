import {
    Component,
    forwardRef,
    HostBinding,
    Input,
    Optional,
    ElementRef,
    OnInit,
    HostListener,
    ContentChildren,
    QueryList,
    AfterViewInit,
    Output,
    EventEmitter,
    TemplateRef,
    ContentChild,
    AfterContentInit,
    ViewChild,
    Renderer2,
    OnDestroy,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyOptionComponent } from './option.component';
import { ThyPositioningService } from '../positioning/positioning.service';
import { isUndefinedOrNull, inputValueToBoolean } from '../util/helpers';
import {
    ScrollStrategy,
    Overlay,
    ViewportRuler,
    ConnectionPositionPair,
    ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EXPANDED_DROPDOWN_POSITIONS } from '../core/overlay/overlay-opsition-map';
import { ThySelectOptionGroupComponent } from './option-group.component';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

export type SelectMode = 'multiple' | '';

export interface OptionValue {
    thyLabelText?: string;
    thyValue?: string;
    thyDisabled?: boolean;
    thyShowOptionCustom?: boolean;
    thySearchKey?: string;
}

const noop = () => {};

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThySelectCustomComponent
    implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    searchText: string;
    // 下拉单选时选择的值
    _innerValue: any;

    _selectedOption: ThyOptionComponent;

    // 下拉多选时选择的值
    _innerValues: any[] = [];

    _selectedOptions: ThyOptionComponent[] = [];

    _disabled = false;

    _size: InputSize;

    _mode: SelectMode;

    _emptyStateText: string;

    _classNames: any = [];

    _viewContentInitialized = false;

    _loadingDone = true;

    _scrollStrategy: ScrollStrategy;

    public dropDownPosition = 'bottom';

    // _positions = [
    //     {
    //         originX: 'start',
    //         originY: 'top',
    //         overlayX: 'start',
    //         overlayY: 'top'
    //     },
    //     {
    //         originX: 'start',
    //         originY: 'bottom',
    //         overlayX: 'start',
    //         overlayY: 'bottom'
    //     }
    // ];

    // private cascaderPositon = [...EXPANDED_DROPDOWN_POSITIONS];
    positions: ConnectionPositionPair[] = EXPANDED_DROPDOWN_POSITIONS;

    // _listOfOptionComponent: QueryList<ThyOptionComponent>;

    /** The last measured value for the trigger's client bounding rect. */
    triggerRect: ClientRect;

    /** Emits whenever the component is destroyed. */
    private readonly _destroy$ = new Subject<void>();

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select-custom') _isSelectCustom = true;

    @HostBinding('class.thy-select') _isSelect = true;

    // 下拉选项是否展示
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

    @Input()
    set thyEmptyStateText(value: string) {
        this._emptyStateText = value;
    }

    @Input() thyAllowClear = false;

    @Input()
    set thyLoadingDone(value: boolean) {
        this._loadingDone = inputValueToBoolean(value);
    }

    @Input()
    set thyDisabled(value: string) {
        this._disabled = inputValueToBoolean(value);
    }

    // @ContentChildren(ThyOptionComponent)
    // set listOfOptionComponent(value: QueryList<ThyOptionComponent>) {
    //     this._listOfOptionComponent = value;
    //     this._setSelectedOptions();
    // }

    @ContentChild('selectedDisplay') selectedValueDisplayRef: TemplateRef<any>;

    @ViewChild('trigger') trigger: ElementRef<any>;

    // @ViewChild('selectContainer')
    // set selectContainerWrapperElementRef(value: ElementRef<any>) {
    //     if (value && value.nativeElement) {
    //         this.autoCalculateMenuPosition(value.nativeElement);
    //     }
    // }

    selectedValueContext: any;

    // _setSelectedOptions() {
    //     if (this._mode === 'multiple') {
    //         if (this._innerValues && this._innerValues.length > 0) {
    //             this._selectedOptions = this.findOptionComponents(item => {
    //                 return this._innerValues.indexOf(item.thyValue) >= 0;
    //             });
    //             this._selectedOptions.forEach(item => {
    //                 item.selected = true;
    //             });
    //         } else {
    //             this._selectedOptions = [];
    //         }

    //         this.selectedValueContext = {
    //             $implicit: this._selectedOptions
    //         };
    //     } else {
    //         // allow value is empty
    //         if (isUndefinedOrNull(this._innerValue)) {
    //             this._selectedOption = null;
    //         } else {
    //             this._selectedOption = this.findOneOptionComponent(item => {
    //                 return item.thyValue === this._innerValue;
    //             });
    //         }
    //         this.selectedValueContext = {
    //             $implicit: this._selectedOption
    //                 ? this._selectedOption.thyRawValue || this._selectedOption.thyValue
    //                 : null
    //         };
    //     }
    // }

    // findOneOptionComponent(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent {
    //     let result: ThyOptionComponent;
    //     this._listOfOptionComponent.forEach(item => {
    //         if (result) {
    //             return;
    //         }
    //         if (item.thyGroupLabel) {
    //             if (item.listOfOptionComponent) {
    //                 item.listOfOptionComponent.forEach(subItem => {
    //                     if (iterate(subItem)) {
    //                         result = subItem;
    //                     }
    //                 });
    //             }
    //         } else {
    //             if (iterate(item)) {
    //                 result = item;
    //             }
    //         }
    //     });
    //     return result;
    // }

    // findOptionComponents(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent[] {
    //     const result: ThyOptionComponent[] = [];
    //     this._listOfOptionComponent.forEach(item => {
    //         if (item.thyGroupLabel) {
    //             item.listOfOptionComponent.forEach(subItem => {
    //                 if (iterate(subItem)) {
    //                     result.push(subItem);
    //                 }
    //             });
    //         } else {
    //             if (iterate(item)) {
    //                 result.push(item);
    //             }
    //         }
    //     });
    //     return result;
    // }

    @ContentChildren(ThyOptionComponent, { descendants: true }) options: QueryList<ThyOptionComponent>;

    @ContentChildren(ThySelectOptionGroupComponent) optionGroups: QueryList<ThySelectOptionGroupComponent>;

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
        private thyPositioningService: ThyPositioningService,
        private renderer: Renderer2,
        private overlay: Overlay,
        private viewportRuler: ViewportRuler,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this._scrollStrategy = overlay.scrollStrategies.reposition();
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
        this.viewportRuler
            .change()
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                if (this._expandOptions) {
                    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                    this.changeDetectorRef.markForCheck();
                }
            });
    }

    // @HostListener('document:click', ['$event'])
    // onDocumentClick(event: Event): void {
    //     event.stopPropagation();
    //     if (!this.elementRef.nativeElement.contains(event.target)) {
    //         if (this.thyShowOptionMenu) {
    //             this._expandOptions = true;
    //         } else {
    //             this._expandOptions = false;
    //         }
    //     }
    // }

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
        // this._viewContentInitialized = true;
        // this._setSelectedOptions();
    }

    writeValue(value: any): void {
        if (this._mode === 'multiple') {
            this._innerValues = value;
        } else {
            this._innerValue = value;
        }
        // if (this._viewContentInitialized) {
        //     this._setSelectedOptions();
        // }
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

    setDisabledState(isDisabled: boolean): void {
        this._disabled = inputValueToBoolean(isDisabled);
    }

    autoCalculateMenuPosition(targetElement: HTMLElement) {
        if (this._expandOptions) {
            const hostElement = this.trigger.nativeElement;
            const targetElBCR = targetElement.getBoundingClientRect();
            const hostOffset = this.thyPositioningService.offset(hostElement);
            const hostPos = this.thyPositioningService.position(hostElement);
            // 底部空间不够
            if (targetElBCR.top + targetElBCR.height > document.documentElement.clientHeight) {
                // 上方可以放下直接放上方，否则遮盖 form-control
                if (targetElBCR.top - hostPos.height < targetElBCR.height) {
                    targetElement.style.top = `${document.documentElement.clientHeight -
                        targetElBCR.top -
                        targetElBCR.height}px`;
                } else {
                    targetElement.style.bottom = `${hostPos.height + 4}px`;
                }
            }
        }
    }

    remove(event: Event, item: ThyOptionComponent, index: number) {
        event.stopPropagation();
        this._selectedOptions.splice(index, 1);
        this._innerValues = this._selectedOptions.map(option => {
            return option.thyValue;
        });
        item.selected = false;
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
            this._innerValues = this._selectedOptions.map(item => {
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

    clearSelectValue(event: Event) {
        event.stopPropagation();
        this._selectedOption = null;
        this._innerValue = null;
        this.valueOnChange(this._innerValue);
        this.selectedValueContext = {
            $implicit: null
        };
    }

    /** Toggles the overlay panel open or closed. */
    toggle(): void {
        this._expandOptions ? this.close() : this.open();
    }

    /** Opens the overlay panel. */
    open(): void {
        if (this._disabled) {
            return;
        }

        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        // this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement).fontSize || '0');

        this._expandOptions = true;
        // this.autoCalculateMenuPosition(this.container.nativeElement);
        // this._keyManager.withHorizontalOrientation(null);
        // this._calculateOverlayPosition();
        // this._highlightCorrectOption();
        // this._changeDetectorRef.markForCheck();
    }

    /** Closes the overlay panel and focuses the host element. */
    close(): void {
        if (this._expandOptions) {
            this._expandOptions = false;
            // this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
            // this._changeDetectorRef.markForCheck();
            // this._onTouched();
        }
    }

    public onPositionChange(position: ConnectedOverlayPositionChange): void {
        const newValue = position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
        if (this.dropDownPosition !== newValue) {
            this.dropDownPosition = newValue;
            this.changeDetectorRef.detectChanges();
        }
    }

    onSearchFilter() {}

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        // this.stateChanges.complete();
    }
}
