import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ImmediateMenuComponent } from './immediate-menu.component';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-immediate-render-example',
    templateUrl: './immediate-render.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective, ThyButton]
})
export class ThyDropdownImmediateRenderExampleComponent {
    immediateRender = false;

    menu = ImmediateMenuComponent;
}
