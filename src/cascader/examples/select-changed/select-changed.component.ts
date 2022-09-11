import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import options from '../cascader-address-options';

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
        this.areaCode = [...options];
    }

    public selectChanges(values: any): void {
        this.notifyService.info('select', values);
    }

    public clearChange() {
        this.notifyService.success('Clear');
    }
}
