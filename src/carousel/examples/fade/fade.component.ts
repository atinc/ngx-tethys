import { Component, OnInit } from '@angular/core';
import { FromTo } from 'ngx-tethys/carousel';

@Component({
    selector: 'thy-carousel-basic-example',
    templateUrl: './fade.component.html',
    styleUrls: ['./fade.component.scss']
})
export class ThyCarouselFadeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    afterChange(event: number) {
        console.log(`当前切换到`, event);
    }

    beforeChange({ from, to }: FromTo) {
        console.log(`从 ${from} 来, 到 ${to} 去`);
    }
}
