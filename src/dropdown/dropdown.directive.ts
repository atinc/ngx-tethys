import { Directive, HostBinding, ElementRef, OnInit } from '@angular/core';

const thyDropdown = 'thyDropdown';

const thyDropdownSplit = 'thyDropdownSplit';

@Directive({
    selector: `[${thyDropdown}],[${thyDropdownSplit}]`,
    host: {
        class: 'thy-dropdown-toggle'
    }
})
export class ThyDropdownDirective implements OnInit {
    @HostBinding('class.thy-dropdown-toggle-split') _isDropdownSplitClass = false;

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        const attrs = Array.from((this.elementRef.nativeElement as HTMLElement).attributes);
        if (attrs.find(item => item.name === thyDropdownSplit.toLocaleLowerCase())) {
            this._isDropdownSplitClass = true;
        }
    }
}
