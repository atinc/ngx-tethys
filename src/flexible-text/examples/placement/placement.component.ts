import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-placement',
    templateUrl: './placement.component.html',
    styleUrls: ['./placement.component.scss']
})
export class ThyFlexibleTextPlacementExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
