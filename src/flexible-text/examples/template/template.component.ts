import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-template',
    templateUrl: './template.component.html',
    standalone: false
})
export class ThyFlexibleTextTemplateExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
