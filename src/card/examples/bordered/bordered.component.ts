import { Component } from '@angular/core';
import { ThyCard, ThyCardHeader, ThyCardContent } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-bordered-example',
    templateUrl: './bordered.component.html',
    imports: [ThyCard, ThyCardHeader, ThyCardContent]
})
export class ThyCardBorderedExampleComponent {}
