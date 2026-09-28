import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-tips-example',
    templateUrl: './tips.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoading]
})
export class ThyLoadingTipsExampleComponent {}
