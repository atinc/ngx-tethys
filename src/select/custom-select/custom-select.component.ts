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
import { ThyOptionComponent, ThyOptionSelectionChangeEvent } from '../../core/option/option.component';
import { coerceBooleanProperty, isArray } from '../../util/helpers';
import {
    ScrollStrategy,
    Overlay,
    ViewportRuler,
    ConnectionPositionPair,
    ScrollDispatcher,
    CdkConnectedOverlay
} from '@angular/cdk/overlay';
import { takeUntil, startWith, take, switchMap } from 'rxjs/operators';
import { Subject, Observable, merge, defer, Subscription, timer } from 'rxjs';
import { getFlexiblePositions } from '../../core/overlay';
import { ThySelectOptionGroupComponent } from '../../core/option/group/option-group.component';
import { SelectionModel } from '@angular/cdk/collections';
import { helpers } from '../../util';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectControlSize, ScrollToService } from '../../core';
import { DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, SPACE, hasModifierKey, HOME, END, A } from '../../util/keycodes';
import { THY_OPTION_PARENT_COMPONENT, IThyOptionParentComponent } from '../../core/option/option.token';

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
            provide: THY_OPTION_PARENT_COMPONENT,
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
export class ThySelectCustomComponent implements ControlValueAccessor, IThyOptionParentComponent, OnInit, AfterContentInit, OnDestroy {
    disabled = false;

    size: SelectControlSize;

    mode: SelectMode = '';

    emptyStateText = '无任何选项';

    emptySearchMessageText = '没有匹配到任何选项';

    scrollStrategy: ScrollStrategy;

    scrollTop = 0;

    modalValue: any = null;

    defaultOffset = 4;

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

    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

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

    @Input() thyLoadState = true;

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
        this.disabled = coerceBooleanProperty(value);
    }

    @Input() thySortComparator: (a: ThyOptionComponent, b: ThyOptionComponent, options: ThyOptionComponent[]) => number;

    @Input()
    thyFooterTemplate: TemplateRef<any>;

    @Input()
    thyFooterClass = 'thy-custom-select-footer';

    @Input() thyAutoExpand: boolean;

    @ContentChild('selectedDisplay', { static: false }) selectedValueDisplayRef: TemplateRef<any>;

    @ViewChild('trigger', { read: ElementRef, static: true }) trigger: ElementRef<any>;

    @ViewChild('panel', { read: ElementRef, static: false }) panel: ElementRef<any>;

    @ContentChildren(ThyOptionComponent, { descendants: true }) options: QueryList<ThyOptionComponent>;

    @ContentChildren(ThySelectOptionGroupComponent) optionGroups: QueryList<ThySelectOptionGroupComponent>;

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (!this.disabled) {
            if (event.keyCode === ENTER) {
                event.stopPropagation();
            }
            this.panelOpen ? this.handleOpenKeydown(event) : this.handleClosedKeydown(event);
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        event.stopPropagation();
        if (!this.elementRef.nativeElement.contains(event.target) && this.panelOpen) {
            this.close();
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
        this.scrollStrategy = this.overlay.scrollStrategies.close();
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
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
            this.resetOptions();
            this.initializeSelection();
            this.initKeyManager();
            this.changeDetectorRef.markForCheck();
        });
        if (this.thyAutoExpand) {
            timer().subscribe(() => {
                this.changeDetectorRef.markForCheck();
                this.open();
                this.focus();
            });
        }
    }

    public get isHiddenOptions(): boolean {
        return this.options.toArray().every(option => option.hidden);
    }

    public onAttached(): void {
        this.cdkConnectedOverlay.positionChange.pipe(take(1)).subscribe(() => {
            if (this.panel) {
                if (this.keyManager.activeItem) {
                    ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel.nativeElement);
                    this.changeDetectorRef.detectChanges();
                } else {
                    if (!this.empty) {
                        ScrollToService.scrollToElement(this.selectionModel.selected[0].element.nativeElement, this.panel.nativeElement);
                        this.changeDetectorRef.detectChanges();
                    }
                }
            }
        });
    }

    public dropDownMouseMove(event: MouseEvent) {
        if (this.keyManager.activeItem) {
            this.keyManager.setActiveItem(-1);
        }
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
        if (!this.options.find(option => option === $event.item)) {
            $event.item.deselect();
            // fix option unselect can not emit changes;
            this.onSelect($event.item, true);
        } else {
            $event.item.deselect();
        }
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

    public toggle(event: MouseEvent): void {
        this.panelOpen ? this.close() : this.open();
    }

    public open(): void {
        if (this.disabled || !this.options || this.panelOpen) {
            return;
        }
        this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        this.panelOpen = true;
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

    private highlightCorrectOption(): void {
        if (this.keyManager) {
            if (this.isMultiple) {
                if (this.keyManager.activeItem) {
                    return;
                }
                if (this.empty) {
                    this.keyManager.setFirstItemActive();
                } else {
                    this.keyManager.setActiveItem(this.selectionModel.selected[0]);
                }
            } else {
                this.keyManager.setActiveItem(-1);
            }
        }
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
                if (this.keyManager.activeItem) {
                    ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel.nativeElement);
                }
            } else if (!this.panelOpen && !this.isMultiple && this.keyManager.activeItem) {
                this.keyManager.activeItem.selectViaInteraction();
            }
        });
    }

    private handleClosedKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
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
        } else if ((keyCode === ENTER || keyCode === SPACE) && (manager.activeItem || !this.empty) && !hasModifierKey(event)) {
            event.preventDefault();
            if (!manager.activeItem) {
                if (manager.activeItemIndex === -1 && !this.empty) {
                    manager.setActiveItem(this.selectionModel.selected[0]);
                }
            }
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
            if (manager.activeItemIndex === -1 && !this.empty) {
                manager.setActiveItem(this.selectionModel.selected[0]);
            }
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
        this.dropDownPositions = getFlexiblePositions('bottom', this.defaultOffset);
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
        this.selectionModelSubscription = this.selectionModel.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
            event.added.forEach(option => option.select());
            event.removed.forEach(option => option.deselect());
        });
    }

    private resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this.destroy$);

        this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed$)).subscribe((event: ThyOptionSelectionChangeEvent) => {
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
            modeClass = `thy-select-dropdown-${this.mode}`;
        } else {
            modeClass = `thy-select-dropdown-single`;
        }
        this.dropDownClass = {
            [`thy-select-dropdown`]: true,
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
        }
        if (this.isMultiple) {
            if (isArray(modalValue)) {
                const selected = [...this.selectionModel.selected];
                this.selectionModel.clear();
                (modalValue as Array<any>).forEach(itemValue => {
                    const option =
                        this.options.find(_option => _option.thyValue === itemValue) ||
                        selected.find(_option => _option.thyValue === itemValue);
                    if (option) {
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

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
