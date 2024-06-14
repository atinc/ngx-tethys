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
import { defer, merge, Observable, Subject, timer } from 'rxjs';
import { take, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import {
    THY_OPTION_PARENT_COMPONENT,
    IThyOptionParentComponent,
    ThyOption,
    ThyOptionSelectionChangeEvent,
    ThyStopPropagationDirective
} from 'ngx-tethys/shared';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ThyEmpty } from 'ngx-tethys/empty';
import { NgClass, NgIf } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/** Event object that is emitted when an autocomplete option is activated. */
export interface ThyAutocompleteActivatedEvent {
    /** Reference to the autocomplete panel that emitted the event. */
    source: ThyAutocomplete;

    /** Option that was selected. */
    option: ThyOption | null;
}

/**
 * 自动完成组件
 * @name thy-autocomplete
 */
@Component({
    selector: 'thy-autocomplete',
    templateUrl: 'autocomplete.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: THY_OPTION_PARENT_COMPONENT,
            useExisting: ThyAutocomplete
        }
    ],
    standalone: true,
    imports: [ThyStopPropagationDirective, NgClass, NgIf, ThyEmpty]
})
export class ThyAutocomplete implements IThyOptionParentComponent, OnInit, AfterContentInit, OnDestroy {
    private ngUnsubscribe$ = new Subject<void>();

    dropDownClass: { [key: string]: boolean };

    isMultiple = false;

    mode = '';

    isEmptyOptions = false;

    selectionModel: SelectionModel<ThyOption>;

    isOpened = false;

    /** Manages active item in option list based on key events. */
    keyManager: ActiveDescendantKeyManager<ThyOption>;

    @ViewChild('contentTemplate', { static: true })
    contentTemplateRef: TemplateRef<any>;

    // scroll element container
    @ViewChild('panel')
    optionsContainer: ElementRef<any>;

    /**
     * @private
     */
    @ContentChildren(ThyOption, { descendants: true }) options: QueryList<ThyOption>;

    readonly optionSelectionChanges: Observable<ThyOptionSelectionChangeEvent> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.selectionChange));
        }
        return this.ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionSelectionChanges)
        );
    }) as Observable<ThyOptionSelectionChangeEvent>;

    /**
     * 空选项时的文本
     * @type string
     */
    @Input()
    thyEmptyText = '没有任何数据';

    /**
     * 是否默认高亮第一个选项
     * @type boolean
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyAutoActiveFirstOption: boolean;

    /**
     * 被选中时调用，参数包含选中项的 value 值
     * @type EventEmitter<ThyOptionSelectionChangeEvent>
     */
    @Output() thyOptionSelected: EventEmitter<ThyOptionSelectionChangeEvent> = new EventEmitter<ThyOptionSelectionChangeEvent>();

    /**
     * 只读，展开下拉菜单的回调
     * @type EventEmitter<void>
     */
    @Output() readonly thyOpened: EventEmitter<void> = new EventEmitter<void>();

    /**
     * 只读，关闭下拉菜单的回调
     * @type EventEmitter<void>
     */
    @Output() readonly thyClosed: EventEmitter<void> = new EventEmitter<void>();

    /** Emits whenever an option is activated using the keyboard. */
    /**
     * 只读，option 激活状态变化时，调用此函数
     * @type EventEmitter<ThyAutocompleteActivatedEvent>
     */
    @Output() readonly thyOptionActivated: EventEmitter<ThyAutocompleteActivatedEvent> = new EventEmitter<ThyAutocompleteActivatedEvent>();

    constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.setDropDownClass();
        this.instanceSelectionModel();
    }

    ngAfterContentInit() {
        this.options.changes.pipe(startWith(null), takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.resetOptions();
            timer(0).subscribe(() => {
                this.isEmptyOptions = this.options.length <= 0;
                this.changeDetectorRef.detectChanges();
            });
            this.initKeyManager();
        });
    }

    initKeyManager() {
        const changedOrDestroyed$ = merge(this.options.changes, this.ngUnsubscribe$);
        this.keyManager = new ActiveDescendantKeyManager<ThyOption>(this.options).withWrap();
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
        this.selectionModel = new SelectionModel<ThyOption>(this.isMultiple);
        this.selectionModel.changed.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(event => {
            event.added.forEach(option => option.select());
            event.removed.forEach(option => option.deselect());
        });
    }

    private onSelect(option: ThyOption, isUserInput: boolean) {
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
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
