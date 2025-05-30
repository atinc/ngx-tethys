import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';
import { ThyCascader } from 'ngx-tethys/cascader';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-cascader-select-changed-example',
    templateUrl: './select-changed.component.html',
    imports: [ThyCascader, FormsModule]
})
export class ThyCascaderSelectChangedExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode: any[] = [];

    public values: any[] = [];

    public multipleValues: any[] = [];

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }

    public clearChange() {
        this.notifyService.success('Clear');
    }
}
