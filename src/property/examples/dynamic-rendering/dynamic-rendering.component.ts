import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-property-dynamic-rendering-example',
    templateUrl: './dynamic-rendering.component.html',
    styleUrls: ['./dynamic-rendering.component.scss'],
    host: {}
})
export class ThyPropertyDynamicRenderingExampleComponent implements OnInit {
    isShow: boolean;

    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            this.isShow = true;
        }, 500);
    }
}
