import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-basic',
    templateUrl: './basic.component.html'
})
export class ThyFlexibleTextBasicExampleComponent implements OnInit {
    private text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    public showTextComponent: string;
    public showTextDirective: string;

    constructor() {}

    ngOnInit() {
        this.showTextComponent = `【Component】${this.text}`;
        this.showTextDirective = `【Directive】${this.text}`;
    }
}
