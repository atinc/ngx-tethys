import {
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ChangeDetectionStrategy,
    HostBinding,
    HostListener,
    ElementRef,
    InjectionToken,
    ChangeDetectorRef,
    EventEmitter,
    OnDestroy,
    Output,
    Inject,
    Optional,
    QueryList
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { SelectOptionBase } from '../../core/select/select-option/select-option-base';
import { ENTER, SPACE, hasModifierKey } from '../../util/keycodes';
import {
    IThySelectOptionGroupComponent,
    IThySelectOptionParentComponent,
    THY_SELECT_OPTION_PARENT_COMPONENT,
    THY_SELECT_OPTION_GROUP_COMPONENT
} from './custom-select.component.token';

export class OptionSelectionChange {
    option: ThyOptionComponent;
    selected: boolean;
}

export class OptionVisibleChange {
    option: ThyOptionComponent;
}

@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOptionComponent extends SelectOptionBase implements OnDestroy, Highlightable {
    private _selected = false;
    private _hidden = false;
    private _disabled = false;
    @Input() thyValue: any;

    @Input() thyRawValue: any;

    @Input() thyLabelText: string;

    @Input() thyShowOptionCustom: boolean;

    @Input() thySearchKey: string;

    @HostBinding('class.thy-option-item') _isOptionItem = true;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    @Input()
    @HostBinding(`class.disabled`)
    set thyDisabled(value: boolean) {
        this._disabled = value;
    }

    get thyDisabled(): boolean {
        return this._disabled;
    }

    get disabled(): boolean {
        return this.hidden || this._disabled;
    }

    @HostBinding('class.hidden')
    get hidden(): boolean {
        return this._hidden;
    }

    @HostBinding('attr.tabindex')
    get tabIndex(): string {
        return this.disabled ? '-1' : '0';
    }

    /** Whether or not the option is currently selected. */
    @HostBinding(`class.active`)
    get selected(): boolean {
        return this._selected;
    }

    @Output() readonly selectionChange: EventEmitter<OptionSelectionChange> = new EventEmitter();
    @Output() readonly visibleChange: EventEmitter<OptionVisibleChange> = new EventEmitter();

    constructor(
        public element: ElementRef<HTMLElement>,
        @Optional() @Inject(THY_SELECT_OPTION_PARENT_COMPONENT) public parent: IThySelectOptionParentComponent,
        @Optional() @Inject(THY_SELECT_OPTION_GROUP_COMPONENT) public group: IThySelectOptionGroupComponent,
        // @Optional() readonly group: ThySelectOptionGroupComponent,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    /** Gets the host DOM element. */
    getHostElement(): HTMLElement {
        return this.element.nativeElement;
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.parent.thyMode === 'multiple') {
            this._selected ? this.deselect() : this.select();
        } else {
            this.select();
        }
    }

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        console.log(`--handleKeydown: option--`);
        if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
            if (this.selected) {
                this.deselect();
            } else {
                this.select();
            }

            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }

    /** Selects the option. */
    select(event?: Event): void {
        if (!this.disabled) {
            if (!this._selected) {
                this._selected = true;
                this.selectionChange.emit({
                    option: this,
                    selected: this._selected
                });
                this.cdr.markForCheck();
            }
        }
    }

    /** Deselects the option. */
    deselect(): void {
        if (this._selected) {
            this._selected = false;
            this.selectionChange.emit({
                option: this,
                selected: this._selected
            });
            this.cdr.markForCheck();
        }
    }

    hideOption() {
        if (!this._hidden) {
            this._hidden = true;
            this.visibleChange.emit({ option: this });
            this.cdr.markForCheck();
        }
    }

    showOption() {
        if (this._hidden) {
            this._hidden = false;
            this.visibleChange.emit({ option: this });
            this.cdr.markForCheck();
        }
    }

    matchSearchText(searchText: string): boolean {
        if (this.thySearchKey) {
            if (this.thySearchKey.indexOf(searchText) >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.thyLabelText.indexOf(searchText) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    setActiveStyles(): void {
        this.getHostElement().classList.add('hover');
        this.cdr.markForCheck();
    }

    setInactiveStyles(): void {
        this.getHostElement().classList.remove('hover');
        this.cdr.markForCheck();
    }

    getLabel?(): string {
        return this.thyLabelText || (this.getHostElement().textContent || '').trim();
    }

    ngOnDestroy() {}
}
