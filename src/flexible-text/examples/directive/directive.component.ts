import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-directive-example',
    templateUrl: './directive.component.html'
})
export class ThyFlexibleTextDirectiveExampleComponent implements OnInit {
    private text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    public showTextDirective: string;

    constructor() {}

    ngOnInit() {
        this.showTextDirective = `【Directive】${this.text}`;
    }
}
