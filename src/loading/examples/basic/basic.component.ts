import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyLoading } from 'ngx-tethys/loading';

@Component({
    selector: 'thy-loading-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoading]
})
export class ThyLoadingBasicExampleComponent implements OnInit {
    public loadingDone = signal<boolean>(false);

    ngOnInit(): void {
        setTimeout(() => {
            this.loadingDone.set(true);
        }, 3000);
    }
}
