import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-loading-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyLoadingBasicExampleComponent implements OnInit {
    public loadingDone = false;

    constructor() {}

    ngOnInit(): void {
        setTimeout(() => {
            this.loadingDone = true;
        }, 3000);
    }
}
