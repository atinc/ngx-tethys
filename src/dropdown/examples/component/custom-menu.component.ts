import { Component } from '@angular/core';
import { ThyDropdownAbstractMenu } from 'ngx-tethys/dropdown';

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
    standalone: false
})
export class CustomMenuComponent extends ThyDropdownAbstractMenu {}
