import { Component, ElementRef, HostListener, inject, input, computed } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { IThyOptionComponent, THY_LIST_OPTION_PARENT_COMPONENT } from '../option.token';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

let _uniqueIdCounter = 0;

/**
 * @private
 * @order 30
 */
@Component({
    selector: 'thy-list-option,[thy-list-option]',
    templateUrl: './list-option.component.html',
    imports: [ThyIcon],
    host: {
        '[class.disabled]': 'thyDisabled()',
        '[class.thy-list-option]': 'isListOption()',
        '[class.thy-grid-option]': 'isGridOption()',
        '[class.active]': 'selected',
        '[attr.role]': 'role',
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyListOption implements IThyOptionComponent, Highlightable {
    element = inject<ElementRef<HTMLElement>>(ElementRef);

    parentSelectionList = inject(THY_LIST_OPTION_PARENT_COMPONENT, { optional: true })!;

    role = 'option';

    tabIndex = -1;

    readonly isMultiple = computed(() => (this.parentSelectionList?.multiple && this.parentSelectionList.multiple()) ?? false);

    readonly isListOption = computed(() => this.parentSelectionList?.layout && this.parentSelectionList?.layout() === 'list');

    readonly isGridOption = computed(() => this.parentSelectionList?.layout && this.parentSelectionList?.layout() === 'grid');

    readonly id = input(`thy-list-option-${_uniqueIdCounter++}`);

    readonly thyValue = input<any>(undefined);

    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    /** Whether the option is selected. */
    get selected() {
        return this.parentSelectionList.isSelected(this);
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if ((this.parentSelectionList.multiple && this.parentSelectionList.multiple()) || !this.parentSelectionList.isSelected(this)) {
            this.parentSelectionList.toggleOption(this, event);
            this.parentSelectionList.setActiveOption(this);
        }
    }

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
