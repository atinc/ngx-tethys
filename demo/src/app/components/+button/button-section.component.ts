import { Component } from '@angular/core';

@Component({
    selector: 'demo-button-section',
    templateUrl: './button-section.component.html',
    //   styleUrls: ['./app.component.scss']
})
export class DemoButtonSectionComponent {

    loading: Boolean = false;

    loadingSeconds: number;

    startLoading() {
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
        // setTimeout(() => {
        //     this.loading = false;
        // }, 3000);
    }
}
