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
import { UpdateHostClassService } from '../../shared/update-host-class.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
    ThyOptionComponent,
    OptionSelectionChange,
    THY_SELECT_OPTION_PARENT_COMPONENT,
    IThySelectOptionParentComponent,
    _countGroupLabelsBeforeOption,
    _getOptionScrollPosition
} from './option.component';
import { inputValueToBoolean, isArray } from '../../util/helpers';
import {
    ScrollStrategy,
    Overlay,
    ViewportRuler,
    ConnectionPositionPair,
    ScrollDispatcher,
    CdkConnectedOverlay
} from '@angular/cdk/overlay';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { takeUntil, startWith, take, switchMap } from 'rxjs/operators';
import { Subject, Observable, merge, defer, Subscription } from 'rxjs';
import { getFlexiblePositions, ThyPlacement } from '../../core/overlay';
import { ThySelectOptionGroupComponent } from './option-group.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ThyScrollDirective } from '../../directive/thy-scroll.directive';
import { helpers } from '../../util';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

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
    _disabled = false;

    _size: InputSize;

    _mode: SelectMode = '';

    _emptyStateText = '没有任何选项';

    _classNames: any = [];

    _viewContentInitialized = false;

    _scrollStrategy: ScrollStrategy;

    _modalValue: any = null;

    defaultOffset = 4;

    defaultMultipleOffset = 10;

    dropDownClass: { [key: string]: boolean };

    public dropDownPositions: ConnectionPositionPair[];

    public _selectionModel: SelectionModel<ThyOptionComponent>;

    selectionModelSubscription: Subscription;

    @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;

    /** The last measured value for the trigger's client bounding rect. */
    triggerRect: ClientRect;

    /** Emits whenever the component is destroyed. */
    private readonly destroy$ = new Subject<void>();

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select-custom') _isSelectCustom = true;

    @HostBinding('class.thy-select') _isSelect = true;

    _panelOpen = false;

    keyManager: ActiveDescendantKeyManager<ThyOptionComponent>;

    // 下拉选项是否展示
    @HostBinding('class.menu-is-opened')
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    @Output() thyOnSearch: EventEmitter<string> = new EventEmitter<string>();

    @Output() thyOnScrollToBottom: EventEmitter<void> = new EventEmitter<void>();

    @Output() thyOnExpandStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() thyShowSearch: boolean;

    @Input() thyPlaceHolder: string;

    @Input() thyServerSearch: boolean;

    @Input() thyHoverTriggerAction: boolean;

    @Input()
    set thyMode(value: SelectMode) {
        this._mode = value;
        this._instanceSelectionModel();
        this.getPositions();
        this.setDropDownClass();
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

    @Input()
    thyEnableScrollLoad = false;

    @Input() thyAllowClear = false;

    @Input()
    set thyDisabled(value: string) {
        this._disabled = inputValueToBoolean(value);
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

    @ViewChild('trigger', { read: ElementRef }) trigger: ElementRef<any>;

    @ViewChild('#panel', { read: ElementRef }) panel: ElementRef<any>;

    @ContentChildren(ThyOptionComponent, { descendants: true }) options: QueryList<ThyOptionComponent>;

    @ContentChildren(ThySelectOptionGroupComponent) optionGroups: QueryList<ThySelectOptionGroupComponent>;

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
        this.getPositions();
        this._scrollStrategy = this.overlay.scrollStrategies.reposition();
        this.viewportRuler
            .change()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this._panelOpen) {
                    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                    this.changeDetectorRef.markForCheck();
                }
            });
        if (!this._selectionModel) {
            this._instanceSelectionModel();
        }
        if (this._size) {
            this._classNames.push(`thy-select-${this._size}`);
        }
        this.updateHostClassService.updateClass(this._classNames);
        this.setDropDownClass();
    }

    ngAfterContentInit() {
        this.options.changes
            .pipe(
                startWith(null),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this._resetOptions();
                this._initializeSelection();
            });
    }

    ngAfterContentChecked() {}

    getPositions() {
        this.dropDownPositions = getFlexiblePositions(
            'bottom',
            this.isMultiple() ? this.defaultMultipleOffset : this.defaultOffset
        );
    }

    setDropDownClass() {
        let modeClass = '';
        if (this.isMultiple()) {
            modeClass = `thy-custom-select-dropdown-${this._mode}`;
        } else {
            modeClass = `thy-custom-select-dropdown-single`;
        }
        this.dropDownClass = {
            [`thy-custom-select-dropdown`]: true,
            [modeClass]: true
        };
    }

    _resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this.destroy$);

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
        if (helpers.isUndefinedOrNull(modalValue)) {
            if (this._selectionModel.selected.length > 0) {
                this._selectionModel.clear();
                this.changeDetectorRef.markForCheck();
            }
            return;
        } else {
            if (this._selectionModel.selected.length > 0) {
                this._selectionModel.clear();
            }
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
        this.updateCdkConnectedOverlayPositions();
    }

    remove($event: { item: ThyOptionComponent; $eventOrigin: Event }) {
        $event.$eventOrigin.stopPropagation();
        if (this._disabled) {
            return;
        }
        $event.item.deselect();
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
        this.thyOnExpandStatusChange.emit(this._panelOpen);
    }

    close(): void {
        if (this._panelOpen) {
            this._panelOpen = false;
            this.thyOnExpandStatusChange.emit(this._panelOpen);
            this.changeDetectorRef.markForCheck();
        }
    }

    onSearchFilter(searchText: string) {
        if (this.thyServerSearch) {
            this.thyOnSearch.emit(searchText);
        } else {
            this.options.forEach(option => {
                if (option.matchSearchText(searchText)) {
                    option.showOption();
                } else {
                    option.hideOption();
                }
            });
            this.updateCdkConnectedOverlayPositions();
        }
    }

    public updateCdkConnectedOverlayPositions(): void {
        setTimeout(() => {
            if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
                this.cdkConnectedOverlay.overlayRef.updatePosition();
            }
        });
    }

    private _instanceSelectionModel() {
        if (this._selectionModel) {
            this._selectionModel.clear();
        }
        this._selectionModel = new SelectionModel<ThyOptionComponent>(this._mode === 'multiple');
        if (this.selectionModelSubscription) {
            this.selectionModelSubscription.unsubscribe();
            this.selectionModelSubscription = null;
        }
        this.selectionModelSubscription = this._selectionModel.onChange
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                event.added.forEach(option => option.select());
                event.removed.forEach(option => option.deselect());
            });
    }

    private isMultiple(): boolean {
        return this._mode === 'multiple';
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

    private _bindOptionsContainerScroll() {
        // if (!this._optionsContainer) {
        //     return;
        // }
        // const height = this._optionsContainer.nativeElement.clientHeight,
        //     scrollHeight = this._optionsContainer.nativeElement.scrollHeight;
        // if (scrollHeight > height) {
        //     this._ngZone.runOutsideAngular(
        //         () =>
        //             (this._optionsContainerScrollSubscription = fromEvent(
        //                 this._optionsContainer.nativeElement,
        //                 'scroll'
        //             )
        //                 .pipe(takeUntil(this.destroy$))
        //                 .subscribe(this._optionsContainerScrolling))
        //     );
        // }
        // this._thyScrollOptionsContainer.elementScrolled().subscribe(() => {
        //     console.log(`11`);
        // });
    }

    public optionsContainerScrolled(elementRef: ElementRef) {
        const scroll = this.elementRef.nativeElement.scrollTop,
            height = this.elementRef.nativeElement.clientHeight,
            scrollHeight = this.elementRef.nativeElement.scrollHeight;
        if (scroll + height + 10 >= scrollHeight) {
            this._ngZone.run(() => {
                this.thyOnScrollToBottom.emit();
            });
        }
    }

    private initKeyManager() {
        this.keyManager = new ActiveDescendantKeyManager<ThyOptionComponent>(this.options)
            .withTypeAhead()
            .withVerticalOrientation()
            .withAllowedModifierKeys(['shiftKey']);

        this.keyManager.tabOut.pipe(takeUntil(this.destroy$)).subscribe(() => {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            //   this.focus();
            this.close();
        });
        this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (this._panelOpen && this.panel) {
                this._scrollActiveOptionIntoView();
            } else if (!this._panelOpen && !this.isMultiple() && this.keyManager.activeItem) {
                this.keyManager.activeItem.setInactiveStyles();
            }
        });
    }

    /** Scrolls the active option into view. */
    private _scrollActiveOptionIntoView(): void {
        const activeOptionIndex = this.keyManager.activeItemIndex || 0;
        const labelCount = _countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);

        // this.panel.nativeElement.scrollTop = _getOptionScrollPosition(
        //     activeOptionIndex + labelCount,
        //     this._getItemHeight(),
        //     this.panel.nativeElement.scrollTop,
        //     SELECT_PANEL_MAX_HEIGHT
        // );
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
