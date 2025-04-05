import { Component } from '@angular/core';
import { ThyCard } from 'ngx-tethys/card';
import { ThyCardHeader } from 'ngx-tethys/card';
import { ThyCardContent } from 'ngx-tethys/card';

@Component({
    selector: 'thy-card-bordered-example',
    templateUrl: './bordered.component.html',
    imports: [ThyCard, ThyCardHeader, ThyCardContent]
})
export class ThyCardBorderedExampleComponent {}
