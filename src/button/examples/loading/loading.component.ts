import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-loading-example',
    templateUrl: './loading.component.html',
    imports: [ThyButton]
})
export class ThyButtonLoadingExampleComponent implements OnInit {
    loading: boolean = false;

    loadingSeconds = 0;

    constructor() {}

    ngOnInit() {}

    startLoading() {
        console.log('click loading');
        this.loading = true;
        this.loadingSeconds = 3;

        const interval = setInterval(() => {
            if (this.loadingSeconds === 0) {
                clearInterval(interval);
                this.loading = false;
            } else {
                this.loadingSeconds = this.loadingSeconds - 1;
            }
        }, 1000);
    }
}
