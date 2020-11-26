import {
    Component,
    TemplateRef,
    ViewChild,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    OnInit,
    Output,
    EventEmitter,
    NgZone,
    OnDestroy,
    AfterContentInit,
    ChangeDetectorRef,
    Input,
    ElementRef
} from '@angular/core';
import { ThyOptionComponent, ThyOptionSelectionChangeEvent } from 'ngx-tethys/core';
import { defer, merge, Observable, timer } from 'rxjs';
import { take, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';
import { SelectionModel } from '@angular/cdk/collections';
import { THY_OPTION_PARENT_COMPONENT, IThyOptionParentComponent } from 'ngx-tethys/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/** Event object that is emitted when an autocomplete option is activated. */
export interface ThyAutocompleteActivatedEvent {
    /** Reference to the autocomplete panel that emitted the event. */
    source: ThyAutocompleteComponent;

    /** Option that was selected. */
    option: ThyOptionComponent | null;
}

@Component({
    selector: 'thy-autocomplete',
    templateUrl: 'autocomplete.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: THY_OPTION_PARENT_COMPONENT,
            useExisting: ThyAutocompleteComponent
        }
    ]
})
export class ThyAutocompleteComponent extends mixinUnsubscribe(MixinBase)
    implements IThyOptionParentComponent, OnInit, AfterContentInit, OnDestroy {
    dropDownClass: { [key: string]: boolean };

    isMultiple = false;

    mode = '';

    isEmptyOptions = false;

    selectionModel: SelectionModel<ThyOptionComponent>;

    isOpened = false;

    /** Manages active item in option list based on key events. */
    keyManager: ActiveDescendantKeyManager<ThyOptionComponent>;

    @ViewChild('contentTemplate', { static: true })
    contentTemplateRef: TemplateRef<any>;

    // scroll element container
    @ViewChild('panel')
    optionsContainer: ElementRef<any>;

    @ContentChildren(ThyOptionComponent, { descendants: true }) options: QueryList<ThyOptionComponent>;

    readonly optionSelectionChanges: Observable<ThyOptionSelectionChangeEvent> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.selectionChange));
        }
        return this.ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionSelectionChanges)
        );
    }) as Observable<ThyOptionSelectionChangeEvent>;

    @Input()
    thyEmptyText = '没有任何数据';

    @Input()
    get thyAutoActiveFirstOption(): boolean {
        return this._autoActiveFirstOption;
    }
    set thyAutoActiveFirstOption(value: boolean) {
        this._autoActiveFirstOption = coerceBooleanProperty(value);
    }
    private _autoActiveFirstOption: boolean;

    @Output() thyOptionSelected: EventEmitter<ThyOptionSelectionChangeEvent> = new EventEmitter<ThyOptionSelectionChangeEvent>();

    @Output() readonly thyOpened: EventEmitter<void> = new EventEmitter<void>();

    @Output() readonly thyClosed: EventEmitter<void> = new EventEmitter<void>();

    /** Emits whenever an option is activated using the keyboard. */
    @Output() readonly thyOptionActivated: EventEmitter<ThyAutocompleteActivatedEvent> = new EventEmitter<ThyAutocompleteActivatedEvent>();

    constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.setDropDownClass();
        this.instanceSelectionModel();
    }

    ngAfterContentInit() {
        this.options.changes.pipe(startWith(null), takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.resetOptions();
            timer().subscribe(() => {
                this.isEmptyOptions = this.options.length <= 0;
                this.changeDetectorRef.detectChanges();
            });
            this.initKeyManager();
        });
    }

    initKeyManager() {
        const changedOrDestroyed$ = merge(this.options.changes, this.ngUnsubscribe$);
        this.keyManager = new ActiveDescendantKeyManager<ThyOptionComponent>(this.options).withWrap();
        this.keyManager.change.pipe(takeUntil(changedOrDestroyed$)).subscribe(index => {
            this.thyOptionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
        });
    }

    open() {
        this.isOpened = true;
        this.changeDetectorRef.markForCheck();
        this.thyOpened.emit();
    }

    close() {
        this.isOpened = false;
        this.thyClosed.emit();
    }

    private resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this.ngUnsubscribe$);

        this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed$)).subscribe((event: ThyOptionSelectionChangeEvent) => {
            this.onSelect(event.option, event.isUserInput);
        });
    }

    private instanceSelectionModel() {
        if (this.selectionModel) {
            this.selectionModel.clear();
        }
        this.selectionModel = new SelectionModel<ThyOptionComponent>(this.isMultiple);
        this.selectionModel.changed.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            event.added.forEach(option => option.select());
            event.removed.forEach(option => option.deselect());
        });
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

            // if (this.isMultiple) {
            //     this.sortValues();
            //     if (isUserInput) {
            //         this.focus();
            //     }
            // }
        }

        if (wasSelected !== this.selectionModel.isSelected(option)) {
            this.thyOptionSelected.emit(new ThyOptionSelectionChangeEvent(option, false));
        }
        this.changeDetectorRef.markForCheck();
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

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
