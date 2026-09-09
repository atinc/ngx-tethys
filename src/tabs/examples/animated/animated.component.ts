import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyTabs, ThyTab } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-animated-example',
    templateUrl: './animated.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsAnimatedExampleComponent {}
