import { Component, OnInit } from '@angular/core';
import { ThyTag, ThyTags } from 'ngx-tethys/tag';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';

@Component({
    selector: 'thy-flexible-text-tooltip-trigger',
    templateUrl: './tooltip-trigger.component.html',
    imports: [ThyTags, ThyTag, ThyDivider, ThyTooltipDirective, ThyFlexibleText]
})
export class ThyFlexibleTexTooltipTriggerExampleComponent implements OnInit {
    public text = `New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users`;

    constructor() {}

    ngOnInit() {}
}
