import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-select-changed-example',
    templateUrl: './select-changed.component.html'
})
export class ThyCascaderSelectChangedExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    public multipleValues: any[] = [];

    constructor(private notifyService: ThyNotifyService) {}

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
