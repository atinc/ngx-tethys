import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-dropdown-immediate-render-example',
    templateUrl: './immediate-render.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyDropdownImmediateRenderExampleComponent {}
