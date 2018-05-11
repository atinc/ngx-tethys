import { Directive, HostBinding, Input, ElementRef } from '@angular/core';

const thyDropdown = 'thyDropdown';

const thyDropdownSplit = 'thyDropdownSplit';

@Directive({
    selector: `[${thyDropdown}],[${thyDropdownSplit}]`
})
export class ThyDropdownDirective {

    @HostBinding('class.dropdown-toggle') _isDropdownClass = true;

    @HostBinding('class.dropdown-toggle-split') _isDropdownSplitClass = false;

    constructor(
        private elementRef: ElementRef
    ) {
        const attrs = Array.from(elementRef.nativeElement.attributes);
        if (attrs.find((item: any) => item.name === thyDropdownSplit.toLocaleLowerCase())) {
            this._isDropdownSplitClass = true;
        }
    }
}
