import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, ViewChildren, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';
import { ThyDropdownDirective } from 'ngx-tethys/dropdown';
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
