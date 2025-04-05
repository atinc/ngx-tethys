import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ImmediateMenuComponent } from './immediate-menu.component';
import { ThyDropdownDirective, ThyDropdownMenuComponent } from 'ngx-tethys/dropdown';

@Component({
    selector: 'thy-dropdown-immediate-render-example',
    templateUrl: './immediate-render.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent]
})
export class ThyDropdownImmediateRenderExampleComponent {
    immediateRender = false;

    menu = ImmediateMenuComponent;
}
