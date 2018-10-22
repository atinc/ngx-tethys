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
import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { inputValueToBoolean } from '../../util/helpers';

let _uniqueIdCounter = 0;

export interface IThyOptionParentComponent {
    multiple?: boolean;
    selectionModel: SelectionModel<ThyListOptionComponent>;
    toggleOption(option: ThyListOptionComponent): void;
    setFocusedOption(option: ThyListOptionComponent): void;
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
export class ThyListOptionComponent implements FocusableOption {

    @HostBinding(`class.thy-list-item`) private _isListOption = true;

    @HostBinding(`attr.role`) private _role = 'option';

    @HostBinding(`attr.tabindex`) private _tabIndex = -1;

    @Input() private id = `thy-list-option-${_uniqueIdCounter++}`;

    @Input() thyValue: any;

    disabled?: boolean;

    /** Whether the option is selected. */
    @HostBinding(`class.active`) selected = false;

    constructor(
        private element: ElementRef<HTMLElement>,
        private changeDetector: ChangeDetectorRef,
        /** @docs-private */
        @Optional() @Inject(THY_OPTION_PARENT_COMPONENT) public parentSelectionList: IThyOptionParentComponent
    ) {

    }

    @HostListener('click', ['$event'])
    onClick() {
        this.parentSelectionList.toggleOption(this);
    }

    @HostListener('focus', ['$event'])
    onFocus() {
        this.parentSelectionList.setFocusedOption(this);
    }

    toggle(): void {
        this.selected = !this.selected;
    }

    /** Allows for programmatic focusing of the option. */
    focus(origin?: FocusOrigin): void {
        this.element.nativeElement.focus();
    }

    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    getLabel() {
        return '';
    }
}
