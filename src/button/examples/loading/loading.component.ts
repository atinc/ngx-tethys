import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-button-loading-example',
    templateUrl: './loading.component.html'
})
export class ThyButtonLoadingExampleComponent implements OnInit {
    loading: Boolean = false;

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
