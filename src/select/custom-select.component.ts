import {
    Component,
    forwardRef,
    HostBinding,
    Input,
    ElementRef,
    OnInit,
    ContentChildren,
    QueryList,
    Output,
    EventEmitter,
    TemplateRef,
    ContentChild,
    ViewChild,
    Renderer2,
    OnDestroy,
    ChangeDetectorRef,
    InjectionToken,
    Inject,
    NgZone,
    AfterContentInit,
    ChangeDetectionStrategy,
    HostListener,
    AfterContentChecked
} from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
    ThyOptionComponent,
    OptionSelectionChange,
    THY_SELECT_OPTION_PARENT_COMPONENT,
    IThySelectOptionParentComponent
} from './option.component';
import { inputValueToBoolean, isArray } from '../util/helpers';
import { ScrollStrategy, Overlay, ViewportRuler, ConnectionPositionPair, ScrollDispatcher } from '@angular/cdk/overlay';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { takeUntil, startWith, take, switchMap, skip } from 'rxjs/operators';
import { Subject, Observable, merge, defer, empty } from 'rxjs';
import { EXPANDED_DROPDOWN_POSITIONS } from '../core/overlay/overlay-opsition-map';
import { ThySelectOptionGroupComponent } from './option-group.component';
import { SelectionModel } from '@angular/cdk/collections';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

export type SelectMode = 'multiple' | '';

export type ThyCustomSelectTriggerType = 'click' | 'hover';

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
    templateUrl: './custom-select.component.html',
    exportAs: 'thyCustomSelect',
    providers: [
        {
            provide: THY_SELECT_OPTION_PARENT_COMPONENT,
            useExisting: ThySelectCustomComponent
        },
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
    implements
        ControlValueAccessor,
        IThySelectOptionParentComponent,
        OnInit,
        AfterContentInit,
        AfterContentChecked,
        OnDestroy {
    searchText: string;

    _disabled = false;

    _size: InputSize;

    _mode: SelectMode;

    _emptyStateText = '没有任何选项';

    _classNames: any = [];

    _viewContentInitialized = false;

    _loadingDone = true;

    _scrollStrategy: ScrollStrategy;

    _modalValue: any;

    public dropDownPosition = 'bottom';

    _selectionModel: SelectionModel<ThyOptionComponent>;

    positions: ConnectionPositionPair[] = EXPANDED_DROPDOWN_POSITIONS;

    /** The last measured value for the trigger's client bounding rect. */
    triggerRect: ClientRect;

    /** Emits whenever the component is destroyed. */
    private readonly _destroy$ = new Subject<void>();

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select-custom') _isSelectCustom = true;

    @HostBinding('class.thy-select') _isSelect = true;

    _panelOpen = false;

    // 下拉选项是否展示
    @HostBinding('class.menu-is-opened')
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    @Output() thyOnSearch: EventEmitter<string> = new EventEmitter<string>();

    @Output() thyOnScrollToBottom: EventEmitter<{ callback: () => void }> = new EventEmitter<{
        callback: () => void;
    }>();

    @Input() thyShowSearch: boolean;

    @Input() thyPlaceHolder: string;

    @Input() thyServerSearch: boolean;

    @Input() thyHoverTriggerAction: boolean;

    @Input() thyScrollLoadMore: boolean;

    @Input()
    set thyMode(value: SelectMode) {
        this._mode = value;
    }

    get thyMode(): SelectMode {
        return this._mode;
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

    /** Whether the select has a value. */
    get empty(): boolean {
        return !this._selectionModel || this._selectionModel.isEmpty();
    }

    /** The currently selected option. */
    get selected(): ThyOptionComponent | ThyOptionComponent[] {
        return this.thyMode === 'multiple' ? this._selectionModel.selected : this._selectionModel.selected[0];
    }

    /** The currently selected option. */
    get firstSelected(): ThyOptionComponent {
        return this._selectionModel.selected[0];
    }

    get selectedDisplayContext(): any {
        const selectedValues = this._selectionModel.selected;
        if (selectedValues.length === 0) {
            return null;
        }
        const context = selectedValues.map((option: ThyOptionComponent) => {
            return option.thyRawValue || option.thyValue;
        });
        if (this.thyMode === 'multiple') {
            return {
                $implicit: context
            };
        } else {
            return {
                $implicit: context[0]
            };
        }
    }

    readonly optionSelectionChanges: Observable<OptionSelectionChange> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.selectionChange));
        }
        return this._ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionSelectionChanges)
        );
    }) as Observable<OptionSelectionChange>;

    @ContentChild('selectedDisplay') selectedValueDisplayRef: TemplateRef<any>;

    @ViewChild('trigger') trigger: ElementRef<any>;

    @ContentChildren(ThyOptionComponent, { descendants: true }) options: QueryList<ThyOptionComponent>;

    @ContentChildren(ThySelectOptionGroupComponent) optionGroups: QueryList<ThySelectOptionGroupComponent>;

    @ViewChild(CdkScrollable)
    cdkScrollable: CdkScrollable;

    constructor(
        private _ngZone: NgZone,
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
        private renderer: Renderer2,
        private overlay: Overlay,
        private viewportRuler: ViewportRuler,
        private changeDetectorRef: ChangeDetectorRef,
        private scrollDispatcher: ScrollDispatcher
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    @HostListener('mouseover', ['$event'])
    public triggerHover($event: Event) {
        if (this.thyHoverTriggerAction) {
            this.open();
        }
    }

    onSelectContainerMouseleave(event: Event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.thyHoverTriggerAction) {
            return;
        }
        this.close();
    }

    writeValue(value: any): void {
        this._modalValue = value;
        if (this.options && this.options.length > 0) {
            this._setSelectionByModelValue(this._modalValue);
        }
    }

    ngOnInit() {
        this._scrollStrategy = this.overlay.scrollStrategies.reposition();
        this.viewportRuler
            .change()
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                if (this._panelOpen) {
                    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                    this.changeDetectorRef.markForCheck();
                }
            });
        this._instanceSelectionModel();
        if (this._size) {
            this._classNames.push(`thy-select-${this._size}`);
        }
        if (this._mode === 'multiple') {
            this._classNames.push(`thy-select-custom--multiple`);
        }
        this.updateHostClassService.updateClass(this._classNames);
        if (this.thyScrollLoadMore) {
            this.scrollDispatcher.scrolled().subscribe((_scrollable: CdkScrollable) => {
                if (_scrollable !== this.cdkScrollable) {
                    return;
                }
                console.log('scroll emit');
                if (this._loadingDone) {
                    const scroll = this.cdkScrollable.getElementRef().nativeElement.scrollTop,
                        height = this.cdkScrollable.getElementRef().nativeElement.clientHeight,
                        scrollHeight = this.cdkScrollable.getElementRef().nativeElement.scrollHeight;
                    if (scroll + height >= scrollHeight) {
                        this._ngZone.run(() => {
                            this._loadingDone = false;
                            this.thyOnScrollToBottom.emit({
                                callback: () => {
                                    this._loadingDone = true;
                                    this.changeDetectorRef.markForCheck();
                                }
                            });
                        });
                    }
                }
            });
        }
    }

    ngAfterContentInit() {
        this._selectionModel.onChange.pipe(takeUntil(this._destroy$)).subscribe(event => {
            event.added.forEach(option => option.select());
            event.removed.forEach(option => option.deselect());
        });
        this.options.changes
            .pipe(
                startWith(null),
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this._resetOptions();
                this._initializeSelection();
            });
    }

    ngAfterContentChecked() {}

    _resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this._destroy$);

        this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed$)).subscribe((event: OptionSelectionChange) => {
            this._onSelect(event.option);
            if (this.thyMode !== 'multiple' && this._panelOpen) {
                this.close();
            }
        });
    }

    _initializeSelection() {
        Promise.resolve().then(() => {
            this._setSelectionByModelValue(this._modalValue);
        });
    }

    _setSelectionByModelValue(modalValue: any) {
        this._selectionModel.clear();
        if (!modalValue) {
            this.changeDetectorRef.markForCheck();
            return;
        }
        if (this._mode === 'multiple') {
            if (isArray(modalValue)) {
                this.options.forEach(option => {
                    const index = (modalValue as Array<any>).findIndex(itemValue => {
                        return itemValue === option.thyValue;
                    });
                    if (index >= 0) {
                        this._selectionModel.select(option);
                    }
                });
            }
        } else {
            const selectedOption = this.options.find(option => {
                return option.thyValue === modalValue;
            });
            if (selectedOption) {
                this._selectionModel.select(selectedOption);
            }
        }
        this.changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    private _emitModelValueChange() {
        const selectedValues = this._selectionModel.selected;
        const changeValue = selectedValues.map((option: ThyOptionComponent) => {
            return option.thyValue;
        });
        if (this._mode === 'multiple') {
            this._modalValue = changeValue;
        } else {
            if (changeValue.length === 0) {
                this._modalValue = null;
            } else {
                this._modalValue = changeValue[0];
            }
        }
        this.onChangeCallback(this._modalValue);
    }

    remove(item: ThyOptionComponent, event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this._disabled) {
            return;
        }
        item.deselect();
    }

    clearSelectValue(event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this._disabled) {
            return;
        }
        this._selectionModel.clear();
        this.changeDetectorRef.markForCheck();
        this._emitModelValueChange();
    }

    toggle(): void {
        this._panelOpen ? this.close() : this.open();
    }

    open(): void {
        if (this._disabled || !this.options || this._panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        this._panelOpen = true;
    }

    close(): void {
        if (this._panelOpen) {
            this._panelOpen = false;
            this.changeDetectorRef.markForCheck();
        }
    }

    onSearchFilter() {
        if (this.thyServerSearch) {
            this.thyOnSearch.emit(this.searchText);
        } else {
            this.options.forEach(option => {
                if (option.matchSearchText(this.searchText)) {
                    option.showOption();
                } else {
                    option.hideOption();
                }
            });
        }
    }

    private _instanceSelectionModel() {
        this._selectionModel = new SelectionModel<ThyOptionComponent>(this._mode === 'multiple');
    }

    _onSelect(option: ThyOptionComponent, event?: Event) {
        const wasSelected = this._selectionModel.isSelected(option);

        if (option.thyValue == null && this.thyMode !== 'multiple') {
            option.deselect();
            this._selectionModel.clear();
        } else {
            option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
        }

        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._emitModelValueChange();
        }
        this.changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
