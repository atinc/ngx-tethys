import { Component, Input, HostBinding, ElementRef, ChangeDetectorRef, HostListener, inject } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { IThyListOptionParentComponent, THY_LIST_OPTION_PARENT_COMPONENT } from '../option.token';
import { ThyIcon } from 'ngx-tethys/icon';

import { coerceBooleanProperty } from 'ngx-tethys/util';

let _uniqueIdCounter = 0;

export type ThyListLayout = 'list' | 'grid';

/**
 * @private
 * @order 30
 */
@Component({
    selector: 'thy-list-option,[thy-list-option]',
    templateUrl: './list-option.component.html',
    imports: [ThyIcon]
})
export class ThyListOption implements Highlightable {
    element = inject<ElementRef<HTMLElement>>(ElementRef);
    private changeDetector = inject(ChangeDetectorRef);
    parentSelectionList = inject(THY_LIST_OPTION_PARENT_COMPONENT, { optional: true })!;

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

    @Input({ transform: coerceBooleanProperty })
    set thyDisabled(value: boolean) {
        this.disabled = value;
    }

    @HostBinding(`class.disabled`) disabled?: boolean;

    /** Whether the option is selected. */
    @HostBinding(`class.active`)
    get selected() {
        return this.parentSelectionList.isSelected(this);
    }

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
