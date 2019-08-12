import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-flexible-text-basic',
    templateUrl: './flexible-text-basic.component.html'
})
export class DemoFlexibleTextBasicComponent implements OnInit {
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
