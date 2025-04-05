import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-dropdown-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyDropdownDirective, ThyIcon, ThyDropdownMenuComponent]
})
export class ThyDropdownBasicExampleComponent {}
