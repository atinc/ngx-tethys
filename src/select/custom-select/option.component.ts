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
import { ThyOptionGroupComponent } from '../../core/option/option-group.component';
import { SelectOptionBase } from '../../core/select/select-option/select-option-base';
import { ENTER, SPACE, hasModifierKey } from '../../util/keycodes';
export class OptionSelectionChange {
    option: ThyOptionComponent;
    selected: boolean;
}

export class OptionVisibleChange {
    option: ThyOptionComponent;
}

export interface IThySelectOptionParentComponent {
    thyMode: 'multiple' | '';
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_SELECT_OPTION_PARENT_COMPONENT = new InjectionToken<IThySelectOptionParentComponent>(
    'THY_SELECT_OPTION_PARENT_COMPONENT'
);

export function countGroupLabelsBeforeOption(
    optionIndex: number,
    options: QueryList<ThyOptionComponent>,
    optionGroups: QueryList<ThyOptionGroupComponent>
): number {
    if (optionGroups.length) {
        const optionsArray = options.toArray();
        const groups = optionGroups.toArray();
        let groupCounter = 0;

        for (let i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }

        return groupCounter;
    }

    return 0;
}

/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionIndex Index of the option to be scrolled into the view.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export function getOptionScrollPosition(
    optionIndex: number,
    labelCount: number,
    optionHeight: number,
    groupHeight: number,
    currentScrollPosition: number,
    panelHeight: number,
    panelPaddingTop: number
): number {
    const optionOffset = optionIndex * optionHeight + labelCount * groupHeight + panelPaddingTop;

    if (optionOffset < currentScrollPosition) {
        return optionOffset - panelPaddingTop;
    }

    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight + panelPaddingTop);
    }

    return currentScrollPosition;
}

@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOptionComponent extends SelectOptionBase implements OnDestroy, Highlightable {
    private _selected = false;
    private _hidden = false;
    @Input() thyValue: any;

    @Input() thyRawValue: any;

    @Input() thyLabelText: string;

    @Input() thyShowOptionCustom: boolean;

    @Input() thySearchKey: string;

    @HostBinding('class.thy-option-item') _isOptionItem = true;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    @Input()
    @HostBinding(`class.disabled`)
    thyDisabled: boolean;

    @HostBinding('class.hidden')
    get hidden(): boolean {
        return this._hidden;
    }

    @HostBinding('attr.tabindex')
    get tabIndex(): string {
        return this.thyDisabled ? '-1' : '0';
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
        @Optional() readonly group: ThyOptionGroupComponent,
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
        if (!this.thyDisabled) {
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
