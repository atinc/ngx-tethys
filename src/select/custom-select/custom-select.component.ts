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
    AfterContentChecked,
    Attribute
} from '@angular/core';
import { UpdateHostClassService } from '../../shared/update-host-class.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
    ThyOptionComponent,
    OptionSelectionChange,
    THY_SELECT_OPTION_PARENT_COMPONENT,
    IThySelectOptionParentComponent,
    countGroupLabelsBeforeOption,
    getOptionScrollPosition
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
import { SelectControlSize } from '../../core';
import {
    DOWN_ARROW,
    UP_ARROW,
    LEFT_ARROW,
    RIGHT_ARROW,
    ENTER,
    SPACE,
    hasModifierKey,
    HOME,
    END,
    A
} from '../../util/keycodes';

export type SelectMode = 'multiple' | '';

export type ThyCustomSelectTriggerType = 'click' | 'hover';

export const SELECT_PANEL_MAX_HEIGHT = 300;

export const SELECT_OPTION_MAX_HEIGHT = 40;

export const SELECT_OPTION_GROUP_MAX_HEIGHT = 30;

export const SELECT_PANEL_PADDING_TOP = 10;

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
    disabled = false;

    _size: SelectControlSize;

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

    public selectionModel: SelectionModel<ThyOptionComponent>;

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

    private scrollTop = 0;

    keyManager: ActiveDescendantKeyManager<ThyOptionComponent>;

    get selected(): ThyOptionComponent | ThyOptionComponent[] {
        return this.isMultiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }

    // 下拉选项是否展示
    @HostBinding('class.menu-is-opened')
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    @HostBinding('attr.tabindex')
    tabIndex = '0';

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
    get thySize(): SelectControlSize {
        return this._size;
    }
    set thySize(value: SelectControlSize) {
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
        this.disabled = inputValueToBoolean(value);
    }

    @Input() sortComparator: (a: ThyOptionComponent, b: ThyOptionComponent, options: ThyOptionComponent[]) => number;

    get selectedDisplayContext(): any {
        const selectedValues = this.selectionModel.selected;
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
        return this.ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionSelectionChanges)
        );
    }) as Observable<OptionSelectionChange>;

    @ContentChild('selectedDisplay') selectedValueDisplayRef: TemplateRef<any>;

    @ViewChild('trigger', { read: ElementRef }) trigger: ElementRef<any>;

    @ViewChild('panel', { read: ElementRef }) panel: ElementRef<any>;

    @ContentChildren(ThyOptionComponent, { descendants: true }) options: QueryList<ThyOptionComponent>;

    @ContentChildren(ThySelectOptionGroupComponent) optionGroups: QueryList<ThySelectOptionGroupComponent>;

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
        private renderer: Renderer2,
        private overlay: Overlay,
        private viewportRuler: ViewportRuler,
        private changeDetectorRef: ChangeDetectorRef,
        private scrollDispatcher: ScrollDispatcher,
        @Attribute('tabindex') tabIndex: string
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

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (!this.disabled) {
            this.panelOpen ? this.handleOpenKeydown(event) : this.handleClosedKeydown(event);
        }
    }

    /** Handles keyboard events while the select is closed. */
    private handleClosedKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        const isArrowKey =
            keyCode === DOWN_ARROW || keyCode === UP_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        const isOpenKey = keyCode === ENTER || keyCode === SPACE;
        const manager = this.keyManager;

        // Open the select on ALT + arrow key to match the native <select>
        if ((isOpenKey && !hasModifierKey(event)) || ((this.isMultiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        } else if (!this.isMultiple) {
            const previouslySelectedOption = this.selected;

            if (keyCode === HOME || keyCode === END) {
                keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
                event.preventDefault();
            } else {
                manager.onKeydown(event);
            }

            const selectedOption = this.selected;

            // Since the value has changed, we need to announce it ourselves.
            // @breaking-change 8.0.0 remove null check for _liveAnnouncer.
            //   if (this._liveAnnouncer && selectedOption && previouslySelectedOption !== selectedOption) {
            //     // We set a duration on the live announcement, because we want the live element to be
            //     // cleared after a while so that users can't navigate to it using the arrow keys.
            //     this._liveAnnouncer.announce((selectedOption as MatOption).viewValue, 10000);
            //   }
        }
    }

    /** Handles keyboard events when the selected is open. */
    private handleOpenKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
        const manager = this.keyManager;

        if (keyCode === HOME || keyCode === END) {
            event.preventDefault();
            keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
        } else if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        } else if ((keyCode === ENTER || keyCode === SPACE) && manager.activeItem && !hasModifierKey(event)) {
            event.preventDefault();
            if (manager.activeItem.selected) {
                manager.activeItem.deselect();
            } else {
                manager.activeItem.select();
            }
        } else if (this.isMultiple && keyCode === A && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.options.some(opt => !opt.thyDisabled && !opt.selected);

            this.options.forEach(option => {
                if (!option.thyDisabled) {
                    hasDeselectedOptions ? option.select() : option.deselect();
                }
            });
        } else {
            const previouslyFocusedIndex = manager.activeItemIndex;

            manager.onKeydown(event);

            if (
                this.isMultiple &&
                isArrowKey &&
                event.shiftKey &&
                manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex
            ) {
                manager.activeItem.select();
            }
        }
    }

    writeValue(value: any): void {
        this._modalValue = value;
        if (this.options && this.options.length > 0) {
            this.setSelectionByModelValue(this._modalValue);
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
        if (!this.selectionModel) {
            this._instanceSelectionModel();
        }
        if (this._size) {
            this._classNames.push(`thy-select-${this._size}`);
        }
        this.updateHostClassService.updateClass(this._classNames);
        this.setDropDownClass();
    }

    ngAfterContentInit() {
        this.initKeyManager();

        this.options.changes
            .pipe(
                startWith(null),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.resetOptions();
                this.initializeSelection();
            });
    }

    ngAfterContentChecked() {}

    getPositions() {
        this.dropDownPositions = getFlexiblePositions(
            'bottom',
            this.isMultiple ? this.defaultMultipleOffset : this.defaultOffset
        );
    }

    setDropDownClass() {
        let modeClass = '';
        if (this.isMultiple) {
            modeClass = `thy-custom-select-dropdown-${this._mode}`;
        } else {
            modeClass = `thy-custom-select-dropdown-single`;
        }
        this.dropDownClass = {
            [`thy-custom-select-dropdown`]: true,
            [modeClass]: true
        };
    }

    resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this.destroy$);

        this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed$)).subscribe((event: OptionSelectionChange) => {
            this.onSelect(event.option);
            if (!this.isMultiple && this._panelOpen) {
                this.close();
                this.focus();
            }
        });
    }

    initializeSelection() {
        Promise.resolve().then(() => {
            this.setSelectionByModelValue(this._modalValue);
        });
    }

    setSelectionByModelValue(modalValue: any) {
        if (helpers.isUndefinedOrNull(modalValue)) {
            if (this.selectionModel.selected.length > 0) {
                this.selectionModel.clear();
                this.changeDetectorRef.markForCheck();
            }
            return;
        } else {
            if (this.selectionModel.selected.length > 0) {
                this.selectionModel.clear();
            }
        }
        if (this.isMultiple) {
            if (isArray(modalValue)) {
                this.options.forEach(option => {
                    const index = (modalValue as Array<any>).findIndex(itemValue => {
                        return itemValue === option.thyValue;
                    });
                    if (index >= 0) {
                        this.selectionModel.select(option);
                    }
                });
            }
        } else {
            const selectedOption = this.options.find(option => {
                return option.thyValue === modalValue;
            });
            if (selectedOption) {
                this.selectionModel.select(selectedOption);
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

    private emitModelValueChange() {
        const selectedValues = this.selectionModel.selected;
        const changeValue = selectedValues.map((option: ThyOptionComponent) => {
            return option.thyValue;
        });
        if (this.isMultiple) {
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
        if (this.disabled) {
            return;
        }
        $event.item.deselect();
    }

    clearSelectValue(event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.disabled) {
            return;
        }
        this.selectionModel.clear();
        this.changeDetectorRef.markForCheck();
        this.emitModelValueChange();
    }

    toggle(): void {
        this._panelOpen ? this.close() : this.open();
    }

    open(): void {
        if (this.disabled || !this.options || this._panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        this._panelOpen = true;

        let selectedOptionOffset = this.empty ? 0 : this.getOptionIndex(this.selectionModel.selected[0]);
        selectedOptionOffset += countGroupLabelsBeforeOption(selectedOptionOffset, this.options, this.optionGroups);
        this.scrollTop = this.calculateOverlayScroll(selectedOptionOffset);

        this.highlightCorrectOption();
        this.thyOnExpandStatusChange.emit(this._panelOpen);
    }

    close(): void {
        if (this._panelOpen) {
            this._panelOpen = false;
            this.thyOnExpandStatusChange.emit(this._panelOpen);
            this.changeDetectorRef.markForCheck();
        }
    }

    private highlightCorrectOption(): void {
        if (this.keyManager) {
            if (this.empty) {
                this.keyManager.setFirstItemActive();
            } else {
                this.keyManager.setActiveItem(this.selectionModel.selected[0]);
            }
        }
    }

    calculateOverlayScroll(selectedIndex: number): number {
        const itemHeight = SELECT_OPTION_MAX_HEIGHT;
        const optionOffsetFromScrollTop = itemHeight * selectedIndex;
        const halfOptionHeight = itemHeight / 2;
        const items = this.getItemCount();
        const panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);

        const scrollContainerHeight = items * itemHeight;
        // The farthest the panel can be scrolled before it hits the bottom
        const maxScroll = scrollContainerHeight - panelHeight;

        const scrollBuffer = panelHeight / 2;

        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
    }

    private getOptionIndex(option: ThyOptionComponent): number | undefined {
        return this.options.reduce((result: number | undefined, current: ThyOptionComponent, index: number) => {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
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
        if (this.selectionModel) {
            this.selectionModel.clear();
        }
        this.selectionModel = new SelectionModel<ThyOptionComponent>(this.isMultiple);
        if (this.selectionModelSubscription) {
            this.selectionModelSubscription.unsubscribe();
            this.selectionModelSubscription = null;
        }
        this.selectionModelSubscription = this.selectionModel.onChange
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                event.added.forEach(option => option.select());
                event.removed.forEach(option => option.deselect());
            });
    }

    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    onAttached(): void {
        this.cdkConnectedOverlay.positionChange.pipe(take(1)).subscribe(() => {
            this.panel.nativeElement.scrollTop = this.scrollTop;
            this.changeDetectorRef.detectChanges();
        });
    }

    private get isMultiple(): boolean {
        return this._mode === 'multiple';
    }

    get empty(): boolean {
        return !this.selectionModel || this.selectionModel.isEmpty();
    }

    private getItemCount(): number {
        return this.options.length + this.optionGroups.length;
    }

    onSelect(option: ThyOptionComponent, event?: Event) {
        const wasSelected = this.selectionModel.isSelected(option);

        if (option.thyValue == null && !this.isMultiple) {
            option.deselect();
            this.selectionModel.clear();
        } else {
            option.selected ? this.selectionModel.select(option) : this.selectionModel.deselect(option);

            this.keyManager.setActiveItem(option);

            if (this.isMultiple) {
                this.sortValues();

                // if (isUserInput) {
                // In case the user selected the option with their mouse, we
                // want to restore focus back to the trigger, in order to
                // prevent the select keyboard controls from clashing with
                // the ones from `mat-option`.
                this.focus();
                // }
            }
        }

        if (wasSelected !== this.selectionModel.isSelected(option)) {
            this.emitModelValueChange();
        }
        this.changeDetectorRef.markForCheck();
    }

    /** Sorts the selected values in the selected based on their order in the panel. */
    private sortValues() {
        if (this.isMultiple) {
            const options = this.options.toArray();

            this.selectionModel.sort((a, b) => {
                return this.sortComparator
                    ? this.sortComparator(a, b, options)
                    : options.indexOf(a) - options.indexOf(b);
            });
        }
    }

    private _bindOptionsContainerScroll() {
        // if (!this._optionsContainer) {
        //     return;
        // }
        // const height = this._optionsContainer.nativeElement.clientHeight,
        //     scrollHeight = this._optionsContainer.nativeElement.scrollHeight;
        // if (scrollHeight > height) {
        //     this.ngZone.runOutsideAngular(
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
            this.ngZone.run(() => {
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
            this.focus();
            this.close();
        });
        this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (this._panelOpen && this.panel) {
                this.scrollActiveOptionIntoView();
            } else if (!this._panelOpen && !this.isMultiple && this.keyManager.activeItem) {
                this.keyManager.activeItem.setInactiveStyles();
            }
        });
    }

    /** Scrolls the active option into view. */
    private scrollActiveOptionIntoView(): void {
        const activeOptionIndex = this.keyManager.activeItemIndex || 0;
        const labelCount = countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);

        this.panel.nativeElement.scrollTop = getOptionScrollPosition(
            activeOptionIndex,
            labelCount,
            SELECT_OPTION_MAX_HEIGHT,
            SELECT_OPTION_GROUP_MAX_HEIGHT,
            this.panel.nativeElement.scrollTop,
            SELECT_PANEL_MAX_HEIGHT,
            SELECT_PANEL_PADDING_TOP
        );
    }

    focus(options?: FocusOptions): void {
        this.elementRef.nativeElement.focus(options);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
