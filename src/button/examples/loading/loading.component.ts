import { Component, signal } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-loading-example',
    templateUrl: './loading.component.html',
    imports: [ThyButton]
})
export class ThyButtonLoadingExampleComponent {
    loading = signal<boolean>(false);

    loadingSeconds = signal<number>(0);

    startLoading() {
        this.loading.set(true);
        this.loadingSeconds.set(3);

        const interval = setInterval(() => {
            if (this.loadingSeconds() === 0) {
                clearInterval(interval);
                this.loading.set(false);
            } else {
                this.loadingSeconds.set(this.loadingSeconds() - 1);
            }
        }, 1000);
    }
}
