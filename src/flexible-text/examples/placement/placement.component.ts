import { Component, OnInit } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';

@Component({
    selector: 'thy-flexible-text-placement',
    templateUrl: './placement.component.html',
    styleUrls: ['./placement.component.scss'],
    imports: [ThySpace, ThySpaceItemDirective, ThyTooltipDirective, ThyFlexibleText]
})
export class ThyFlexibleTextPlacementExampleComponent implements OnInit {
    public text = `New platforms are providing creators`;

    constructor() {}

    ngOnInit() {}
}
