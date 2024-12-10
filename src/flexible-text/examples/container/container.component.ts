import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-flexible-text-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
    standalone: false
})
export class ThyFlexibleTextContainerExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
