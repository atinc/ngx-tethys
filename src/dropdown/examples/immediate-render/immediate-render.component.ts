import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ImmediateMenuComponent } from './immediate-menu.component';

@Component({
    selector: 'thy-dropdown-immediate-render-example',
    templateUrl: './immediate-render.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyDropdownImmediateRenderExampleComponent {
    immediateRender = false;

    menu = ImmediateMenuComponent;
}
