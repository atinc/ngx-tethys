import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-basic',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyFlexibleTextBasicExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
