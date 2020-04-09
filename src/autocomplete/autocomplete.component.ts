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
    Input
} from '@angular/core';
import { ThyOptionComponent, ThyOptionSelectionChangeEvent } from '../core/option/option.component';
import { defer, merge, Observable, timer } from 'rxjs';
import { take, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { MixinBase, mixinUnsubscribe } from '../core';
import { SelectionModel } from '@angular/cdk/collections';
import { THY_OPTION_PARENT_COMPONENT, IThyOptionParentComponent } from '../core/option/option.token';

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

    autocompleteOpened = false;

    @ViewChild('content')
    contentTemplateRef: TemplateRef<any>;

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
    emptyStateText = '没有任何数据';

    @Output() optionSelected: EventEmitter<ThyOptionComponent> = new EventEmitter<ThyOptionComponent>();

    @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

    @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

    constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.setDropDownClass();
        this.instanceSelectionModel();
    }

    ngAfterContentInit() {
        this.options.changes
            .pipe(
                startWith(null),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe(() => {
                this.resetOptions();
                timer().subscribe(() => {
                    this.isEmptyOptions = this.options.length <= 0;
                    this.changeDetectorRef.detectChanges();
                });
                // this.initializeSelection();
                // this.initKeyManager();
            });
    }

    private resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this.ngUnsubscribe$);

        this.optionSelectionChanges
            .pipe(takeUntil(changedOrDestroyed$))
            .subscribe((event: ThyOptionSelectionChangeEvent) => {
                this.onSelect(event.option, event.isUserInput);
            });
    }

    private instanceSelectionModel() {
        if (this.selectionModel) {
            this.selectionModel.clear();
        }
        this.selectionModel = new SelectionModel<ThyOptionComponent>(this.isMultiple);
        this.selectionModel.onChange.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
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

            // if (isUserInput) {
            //     this.keyManager.setActiveItem(option);
            // }

            // if (this.isMultiple) {
            //     this.sortValues();
            //     if (isUserInput) {
            //         this.focus();
            //     }
            // }
        }

        if (wasSelected !== this.selectionModel.isSelected(option)) {
            this.optionSelected.emit(option);
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

    open() {
        this.autocompleteOpened = true;
        this.changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
