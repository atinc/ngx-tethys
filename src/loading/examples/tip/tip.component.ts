import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-tip-example',
    templateUrl: './tip.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoading]
})
export class ThyLoadingTipExampleComponent {}
