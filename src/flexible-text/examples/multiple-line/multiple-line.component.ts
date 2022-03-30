import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-multiple',
    templateUrl: './multiple-line.component.html',
    styleUrls: ['./multiple-line.component.scss']
})
export class ThyFlexibleTextMultipleLineExampleComponent implements OnInit {
    public textLong = `New platforms are providing creators with a chance
    bypass pirate sites and platform rules, and connect directly with users;New platforms are providing creators with a chance
    bypass pirate sites and platform rules, and connect directly with users;New platforms are providing creators with a chance
    bypass pirate sites and platform rules, and connect directly with users;New platforms are providing creators with a chance
    bypass pirate sites and platform rules, and connect directly with users;`;
    public textShort = `New platforms are providing creators`;
    constructor() {}

    ngOnInit() {}
}
