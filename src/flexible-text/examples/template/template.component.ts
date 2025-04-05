import { Component, OnInit } from '@angular/core';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-flexible-text-template',
    templateUrl: './template.component.html',
    imports: [ThyTooltipDirective, ThyFlexibleText, ThyTag]
})
export class ThyFlexibleTextTemplateExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
