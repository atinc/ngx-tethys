import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-trigger',
    templateUrl: './trigger.component.html'
})
export class ThyFlexibleTexTriggerExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
