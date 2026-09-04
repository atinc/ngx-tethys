import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-mask-example',
    templateUrl: './mask.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoading]
})
export class ThyLoadingMaskExampleComponent {}
