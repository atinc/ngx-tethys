import { Component } from '@angular/core';
import { ThyDropdownAbstractMenu, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';

@Component({
    selector: 'thy-custom-menu',
    template: `
        <a thyDropdownMenuItem href="javascript:;">
            <span>Menu Item1</span>
        </a>
        <a thyDropdownMenuItem href="javascript:;">
            <span>Menu Item2</span>
        </a>
    `,
    imports: [ThyDropdownMenuItemDirective]
})
export class CustomMenuComponent extends ThyDropdownAbstractMenu {}
