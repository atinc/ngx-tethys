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
    NgZone,
    AfterContentInit,
    ChangeDetectionStrategy,
    HostListener,
    Attribute
} from '@angular/core';
import { UpdateHostClassService } from '../../shared/update-host-class.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyOptionComponent, ThyOptionSelectionChangeEvent } from './option.component';
import { inputValueToBoolean, isArray } from '../../util/helpers';
import {
    ScrollStrategy,
    Overlay,
    ViewportRuler,
    ConnectionPositionPair,
    ScrollDispatcher,
    CdkConnectedOverlay
} from '@angular/cdk/overlay';
import { takeUntil, startWith, take, switchMap } from 'rxjs/operators';
import { Subject, Observable, merge, defer, Subscription } from 'rxjs';
import { getFlexiblePositions } from '../../core/overlay';
import { ThySelectOptionGroupComponent } from './option-group.component';
import { SelectionModel } from '@angular/cdk/collections';
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
import { THY_CUSTOM_SELECT_COMPONENT, IThyCustomSelectComponent } from './custom-select.component.token';

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
            provide: THY_CUSTOM_SELECT_COMPONENT,
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
    implements ControlValueAccessor, IThyCustomSelectComponent, OnInit, AfterContentInit, OnDestroy {
    disabled = false;

    size: SelectControlSize;

    mode: SelectMode = '';

    emptyStateText = '无任何选项';

    emptySearchMessageText = '没有匹配到任何选项';

    scrollStrategy: ScrollStrategy;

    scrollTop = 0;

    modalValue: any = null;

    defaultOffset = 4;

    defaultMultipleOffset = 10;

    dropDownClass: { [key: string]: boolean };

    public dropDownPositions: ConnectionPositionPair[];

    public selectionModel: SelectionModel<ThyOptionComponent>;

    public triggerRect: ClientRect;

    private selectionModelSubscription: Subscription;

    private readonly destroy$ = new Subject<void>();

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    readonly optionSelectionChanges: Observable<ThyOptionSelectionChangeEvent> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.selectionChange));
        }
        return this.ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionSelectionChanges)
        );
    }) as Observable<ThyOptionSelectionChangeEvent>;

    @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;

    @HostBinding('class.thy-select-custom') isSelectCustom = true;

    @HostBinding('class.thy-select') isSelect = true;

    keyManager: ActiveDescendantKeyManager<ThyOptionComponent>;

    @HostBinding('class.menu-is-opened')
    panelOpen = false;

    @HostBinding('attr.tabindex')
    tabIndex = '0';

    @Output() thyOnSearch: EventEmitter<string> = new EventEmitter<string>();

    @Output() thyOnScrollToBottom: EventEmitter<void> = new EventEmitter<void>();

    @Output() thyOnExpandStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() thyShowSearch: boolean;

    @Input() thyPlaceHolder: string;

    @Input() thyServerSearch: boolean;

    @Input()
    set thyMode(value: SelectMode) {
        this.mode = value;
        this.instanceSelectionModel();
        this.getPositions();
        this.setDropDownClass();
    }

    get thyMode(): SelectMode {
        return this.mode;
    }

    @Input()
    get thySize(): SelectControlSize {
        return this.size;
    }
    set thySize(value: SelectControlSize) {
        this.size = value;
    }

    @Input()
    set thyEmptyStateText(value: string) {
        this.emptyStateText = value;
    }

    @Input()
    set thyEmptySearchMessageText(value: string) {
        this.emptySearchMessageText = value;
    }

    @Input()
    thyEnableScrollLoad = false;

    @Input() thyAllowClear = false;

    @Input()
    set thyDisabled(value: string) {
        this.disabled = inputValueToBoolean(value);
    }

    @Input() thySortComparator: (a: ThyOptionComponent, b: ThyOptionComponent, options: ThyOptionComponent[]) => number;

    @ContentChild('selectedDisplay') selectedValueDisplayRef: TemplateRef<any>;

    @ViewChild('trigger', { read: ElementRef }) trigger: ElementRef<any>;

    @ViewChild('panel', { read: ElementRef }) panel: ElementRef<any>;

    @ContentChildren(ThyOptionComponent, { descendants: true }) options: QueryList<ThyOptionComponent>;

    @ContentChildren(ThySelectOptionGroupComponent) optionGroups: QueryList<ThySelectOptionGroupComponent>;

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (!this.disabled) {
            this.panelOpen ? this.handleOpenKeydown(event) : this.handleClosedKeydown(event);
        }
    }

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

    writeValue(value: any): void {
        this.modalValue = value;
        if (this.options && this.options.length > 0) {
            this.setSelectionByModelValue(this.modalValue);
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    ngOnInit() {
        this.getPositions();
        this.scrollStrategy = this.overlay.scrollStrategies.reposition();
        this.viewportRuler
            .change()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.panelOpen) {
                    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                    this.changeDetectorRef.markForCheck();
                }
            });
        if (!this.selectionModel) {
            this.instanceSelectionModel();
        }
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

    public get isShowEmptySearchResult(): boolean {
        return !this.options.some(option => !option.hidden);
    }

    public onAttached(): void {
        this.cdkConnectedOverlay.positionChange.pipe(take(1)).subscribe(() => {
            if (this.panel) {
                this.panel.nativeElement.scrollTop = this.scrollTop;
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    public onOptionsScrolled(elementRef: ElementRef) {
        const scroll = this.elementRef.nativeElement.scrollTop,
            height = this.elementRef.nativeElement.clientHeight,
            scrollHeight = this.elementRef.nativeElement.scrollHeight;
        if (scroll + height + 10 >= scrollHeight) {
            this.ngZone.run(() => {
                this.thyOnScrollToBottom.emit();
            });
        }
    }

    public focus(options?: FocusOptions): void {
        this.elementRef.nativeElement.focus(options);
    }

    public onSearchFilter(searchText: string) {
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

    public remove($event: { item: ThyOptionComponent; $eventOrigin: Event }) {
        $event.$eventOrigin.stopPropagation();
        if (this.disabled) {
            return;
        }
        $event.item.deselect();
    }

    public clearSelectValue(event?: Event) {
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

    public updateCdkConnectedOverlayPositions(): void {
        setTimeout(() => {
            if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
                this.cdkConnectedOverlay.overlayRef.updatePosition();
            }
        });
    }

    public get selected(): ThyOptionComponent | ThyOptionComponent[] {
        return this.isMultiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }

    public get isMultiple(): boolean {
        return this.mode === 'multiple';
    }

    public get empty(): boolean {
        return !this.selectionModel || this.selectionModel.isEmpty();
    }

    public getItemCount(): number {
        return this.options.length + this.optionGroups.length;
    }

    public toggle(): void {
        this.panelOpen ? this.close() : this.open();
    }

    public open(): void {
        if (this.disabled || !this.options || this.panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        this.panelOpen = true;

        let selectedOptionOffset = this.empty ? 0 : this.getOptionIndex(this.selectionModel.selected[0]);
        selectedOptionOffset += this.countGroupLabelsBeforeOption(
            selectedOptionOffset,
            this.options,
            this.optionGroups
        );
        this.scrollTop = this.calculateOverlayScroll(selectedOptionOffset);

        this.highlightCorrectOption();
        this.thyOnExpandStatusChange.emit(this.panelOpen);
    }

    public close(): void {
        if (this.panelOpen) {
            this.panelOpen = false;
            this.thyOnExpandStatusChange.emit(this.panelOpen);
            this.focus();
            this.changeDetectorRef.markForCheck();
        }
    }

    private emitModelValueChange() {
        const selectedValues = this.selectionModel.selected;
        const changeValue = selectedValues.map((option: ThyOptionComponent) => {
            return option.thyValue;
        });
        if (this.isMultiple) {
            this.modalValue = changeValue;
        } else {
            if (changeValue.length === 0) {
                this.modalValue = null;
            } else {
                this.modalValue = changeValue[0];
            }
        }
        this.onChangeCallback(this.modalValue);
        this.updateCdkConnectedOverlayPositions();
    }

    private calculateOverlayScroll(selectedIndex: number): number {
        const itemHeight = SELECT_OPTION_MAX_HEIGHT;
        const optionOffsetFromScrollTop = itemHeight * selectedIndex;
        const halfOptionHeight = itemHeight / 2;
        const items = this.getItemCount();
        const panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);

        const scrollContainerHeight = items * itemHeight;
        const maxScroll = scrollContainerHeight - panelHeight;

        const scrollBuffer = panelHeight / 2;
        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
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

    private getOptionIndex(option: ThyOptionComponent): number | undefined {
        return this.options.reduce((result: number | undefined, current: ThyOptionComponent, index: number) => {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    }

    private initKeyManager() {
        this.keyManager = new ActiveDescendantKeyManager<ThyOptionComponent>(this.options)
            .withTypeAhead()
            .withWrap()
            .withVerticalOrientation()
            .withAllowedModifierKeys(['shiftKey']);

        this.keyManager.tabOut.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.focus();
            this.close();
        });
        this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (this.panelOpen && this.panel) {
                this.scrollActiveOptionIntoView();
            } else if (!this.panelOpen && !this.isMultiple && this.keyManager.activeItem) {
                this.keyManager.activeItem.selectViaInteraction();
            }
        });
    }

    private scrollActiveOptionIntoView(): void {
        const activeOptionIndex = this.keyManager.activeItemIndex || 0;
        const labelCount = this.countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
        const beforeOptionCount = this.countOptionComponentBeforeOption(activeOptionIndex, this.options);
        this.panel.nativeElement.scrollTop = this.getOptionScrollPosition(
            beforeOptionCount,
            labelCount,
            SELECT_OPTION_MAX_HEIGHT,
            SELECT_OPTION_GROUP_MAX_HEIGHT,
            this.panel.nativeElement.scrollTop,
            SELECT_PANEL_MAX_HEIGHT,
            SELECT_PANEL_PADDING_TOP
        );
    }

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
        }
    }

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
            manager.activeItem.selectViaInteraction();
        } else if (this.isMultiple && keyCode === A && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.options.some(opt => !opt.disabled && !opt.selected);

            this.options.forEach(option => {
                if (!option.disabled) {
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
                manager.activeItem.selectViaInteraction();
            }
        }
    }

    private getPositions() {
        this.dropDownPositions = getFlexiblePositions(
            'bottom',
            this.isMultiple ? this.defaultMultipleOffset : this.defaultOffset
        );
    }

    private instanceSelectionModel() {
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

    private resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this.destroy$);

        this.optionSelectionChanges
            .pipe(takeUntil(changedOrDestroyed$))
            .subscribe((event: ThyOptionSelectionChangeEvent) => {
                this.onSelect(event.option, event.isUserInput);
                if (event.isUserInput && !this.isMultiple && this.panelOpen) {
                    this.close();
                    this.focus();
                }
            });
    }

    private initializeSelection() {
        Promise.resolve().then(() => {
            this.setSelectionByModelValue(this.modalValue);
        });
    }

    private setDropDownClass() {
        let modeClass = '';
        if (this.isMultiple) {
            modeClass = `thy-custom-select-dropdown-${this.mode}`;
        } else {
            modeClass = `thy-custom-select-dropdown-single`;
        }
        this.dropDownClass = {
            [`thy-custom-select-dropdown`]: true,
            [modeClass]: true
        };
    }

    private setSelectionByModelValue(modalValue: any) {
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

    private onSelect(option: ThyOptionComponent, isUserInput: boolean) {
        const wasSelected = this.selectionModel.isSelected(option);

        if (option.thyValue == null && !this.isMultiple) {
            option.deselect();
            this.selectionModel.clear();
        } else {
            if (wasSelected !== option.selected) {
                option.selected ? this.selectionModel.select(option) : this.selectionModel.deselect(option);
            }

            if (isUserInput) {
                this.keyManager.setActiveItem(option);
            }

            if (this.isMultiple) {
                this.sortValues();
                if (isUserInput) {
                    this.focus();
                }
            }
        }

        if (wasSelected !== this.selectionModel.isSelected(option)) {
            this.emitModelValueChange();
        }
        this.changeDetectorRef.markForCheck();
    }

    private sortValues() {
        if (this.isMultiple) {
            const options = this.options.toArray();

            if (this.thySortComparator) {
                this.selectionModel.sort((a, b) => {
                    return this.thySortComparator(a, b, options);
                });
            }
        }
    }

    private countGroupLabelsBeforeOption(
        optionIndex: number,
        options: QueryList<ThyOptionComponent>,
        optionGroups: QueryList<ThySelectOptionGroupComponent>
    ): number {
        if (optionGroups.length) {
            const optionsArray = options.toArray();
            const groups = optionGroups.toArray();
            let groupCounter = 0;

            for (let i = 0; i < optionIndex + 1; i++) {
                if (
                    optionsArray[i].group &&
                    !optionsArray[i].group.hidden &&
                    optionsArray[i].group === groups[groupCounter]
                ) {
                    groupCounter++;
                }
            }

            return groupCounter;
        }

        return 0;
    }

    private countOptionComponentBeforeOption(optionIndex: number, options: QueryList<ThyOptionComponent>): number {
        if (options.length) {
            const optionsArray = options.toArray();
            let optionCounter = 0;

            for (let i = 0; i < optionIndex; i++) {
                if (!optionsArray[i].hidden) {
                    optionCounter++;
                }
            }

            return optionCounter;
        }

        return 0;
    }

    private getOptionScrollPosition(
        beforeOptionCount: number,
        labelCount: number,
        optionHeight: number,
        groupHeight: number,
        currentScrollPosition: number,
        panelHeight: number,
        panelPaddingTop: number
    ): number {
        const optionOffset = beforeOptionCount * optionHeight + labelCount * groupHeight + panelPaddingTop;

        if (optionOffset < currentScrollPosition) {
            return optionOffset - panelPaddingTop;
        }

        if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
            return Math.max(0, optionOffset - panelHeight + optionHeight + panelPaddingTop);
        }

        return currentScrollPosition;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
