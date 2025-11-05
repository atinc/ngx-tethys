import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyCascader } from 'ngx-tethys/cascader';
import { clone, options } from '../cascader-address-options';
import { FormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';

@Component({
    selector: 'thy-cascader-loading-example',
    templateUrl: './loading.component.html',
    imports: [ThyCascader, FormsModule]
})
export class ThyCascaderLoadingExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode: any[] = [];

    public values: any[] = ['12', '1201', '120102'];

    loadingDone = false;

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }

    thyExpandStatusChange(expand) {
        if (expand) {
            this.loadingDone = false;
            of(true)
                .pipe(delay(2000))
                .subscribe(() => {
                    this.loadingDone = true;
                });
        }
    }
}
