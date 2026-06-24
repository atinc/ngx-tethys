import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyCard, ThyCardHeader, ThyCardContent } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-bordered-example',
    templateUrl: './bordered.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCard, ThyCardHeader, ThyCardContent]
})
export class ThyCardBorderedExampleComponent {}
