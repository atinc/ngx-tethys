import { Component, Input, HostBinding, ElementRef, ChangeDetectorRef, Inject, HostListener, Optional } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { IThyListOptionParentComponent, THY_LIST_OPTION_PARENT_COMPONENT } from '../option.token';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf } from '@angular/common';
import { InputBoolean } from 'ngx-tethys/core';

let _uniqueIdCounter = 0;

export type ThyListLayout = 'list' | 'grid';

/**
 * @private
 * @order 30
 */
@Component({
    selector: 'thy-list-option,[thy-list-option]',
    templateUrl: './list-option.component.html',
    standalone: true,
    imports: [NgIf, ThyIcon]
})
export class ThyListOption implements Highlightable {
    @HostBinding(`class.thy-list-option`)
    get _isListOption() {
        return this.parentSelectionList.layout === 'list';
    }

    @HostBinding(`class.thy-grid-option`)
    get _parentLayout() {
        return this.parentSelectionList.layout === 'grid';
    }

    @HostBinding(`attr.role`) _role = 'option';

    @HostBinding(`attr.tabindex`) _tabIndex = -1;

    @Input() id = `thy-list-option-${_uniqueIdCounter++}`;

    @Input() thyValue: any;

    @Input()
    @InputBoolean()
    set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    @HostBinding(`class.disabled`) disabled?: boolean;

    /** Whether the option is selected. */
    @HostBinding(`class.active`)
    get selected() {
        return this.parentSelectionList.isSelected(this);
    }

    constructor(
        public element: ElementRef<HTMLElement>,
        private changeDetector: ChangeDetectorRef,
        /** @docs-private */
        @Optional() @Inject(THY_LIST_OPTION_PARENT_COMPONENT) public parentSelectionList: IThyListOptionParentComponent
    ) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.parentSelectionList.multiple || !this.parentSelectionList.isSelected(this)) {
            this.parentSelectionList.toggleOption(this, event);
            this.parentSelectionList.setActiveOption(this);
        }
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
