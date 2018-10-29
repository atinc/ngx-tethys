import {
    Component,
    Input,
    HostBinding,
    ElementRef,
    ChangeDetectorRef,
    Inject,
    forwardRef,
    InjectionToken,
    HostListener,
    Optional
} from '@angular/core';
import { FocusableOption, FocusOrigin, Highlightable } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { inputValueToBoolean } from '../../util/helpers';

let _uniqueIdCounter = 0;

export interface IThyOptionParentComponent {
    multiple?: boolean;
    selectionModel: SelectionModel<ThyListOptionComponent>;
    toggleOption(option: ThyListOptionComponent, event?: Event): void;
    setActiveOption(option: ThyListOptionComponent, event?: Event): void;
    scrollIntoView(option: ThyListOptionComponent): void;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_OPTION_PARENT_COMPONENT =
    new InjectionToken<IThyOptionParentComponent>('THY_OPTION_PARENT_COMPONENT');


@Component({
    selector: 'thy-list-option,[thy-list-option]',
    templateUrl: './list-option.component.html'
})
export class ThyListOptionComponent implements Highlightable {

    @HostBinding(`class.thy-list-item`) _isListOption = true;

    @HostBinding(`attr.role`) _role = 'option';

    @HostBinding(`attr.tabindex`) _tabIndex = -1;

    @Input() id = `thy-list-option-${_uniqueIdCounter++}`;

    @Input() thyValue: any;

    disabled?: boolean;

    /** Whether the option is selected. */
    @HostBinding(`class.active`)
    get selected() {
        return this.parentSelectionList.selectionModel.isSelected(this.thyValue);
    }

    constructor(
        public element: ElementRef<HTMLElement>,
        private changeDetector: ChangeDetectorRef,
        /** @docs-private */
        @Optional() @Inject(THY_OPTION_PARENT_COMPONENT) public parentSelectionList: IThyOptionParentComponent
    ) {

    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.parentSelectionList.toggleOption(this, event);
        this.parentSelectionList.setActiveOption(this);
    }

    // @HostListener('focus', ['$event'])
    // onFocus(event: Event) {
    //     this.parentSelectionList.setFocusedOption(this, event);
    // }

    /** Allows for programmatic focusing of the option. */
    // focus(origin?: FocusOrigin): void {
    //     this.element.nativeElement.focus();
    // }

    setActiveStyles(): void {
        this.element.nativeElement.classList.add('hover');
        this.parentSelectionList.scrollIntoView(this);
    }

    setInactiveStyles(): void {
        this.element.nativeElement.classList.remove('hover');
    }

    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    getLabel() {
        return '';
    }
}
