import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-placement',
    templateUrl: './placement.component.html',
    styleUrls: ['./placement.component.scss'],
    standalone: false
})
export class ThyFlexibleTextPlacementExampleComponent implements OnInit {
    public text = `New platforms are providing creators`;

    constructor() {}

    ngOnInit() {}
}
