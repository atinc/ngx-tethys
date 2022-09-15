import { Component, OnInit } from '@angular/core';
import { ThyCarouselTrigger } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './trigger.component.html',
    styleUrls: ['./trigger.component.scss']
})
export class ThyCarouselTriggerExampleComponent implements OnInit {
    constructor() {}

    array: string[] = [];

    trigger: ThyCarouselTrigger = 'click';

    ngOnInit(): void {}
}
