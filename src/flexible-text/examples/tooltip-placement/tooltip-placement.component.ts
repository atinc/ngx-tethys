import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-tooltip-placement',
    templateUrl: './tooltip-placement.component.html'
})
export class ThyFlexibleTextTooltipPlacementExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
