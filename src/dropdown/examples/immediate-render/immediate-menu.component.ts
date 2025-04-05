import { Component } from '@angular/core';
import { ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';

@Component({
    selector: 'thy-custom-menu',
    template: `
        <thy-dropdown-menu thyImmediateRender>
            <a class="active" thyDropdownMenuItem href="javascript:;">
                <span>Immediate Menu Item1</span>
            </a>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Immediate Menu Item2</span>
            </a>
        </thy-dropdown-menu>
    `,
    imports: [ThyDropdownMenuComponent, ThyDropdownMenuItemDirective]
})
export class ImmediateMenuComponent {}
