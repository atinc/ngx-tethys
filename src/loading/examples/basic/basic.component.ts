import { Component, OnInit } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyLoading]
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
