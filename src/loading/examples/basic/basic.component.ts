import { Component, signal } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyLoading]
})
export class ThyLoadingBasicExampleComponent {
    public loadingDone = signal<boolean>(false);

    ngOnInit(): void {
        setTimeout(() => {
            this.loadingDone.set(true);
        }, 3000);
    }
}
