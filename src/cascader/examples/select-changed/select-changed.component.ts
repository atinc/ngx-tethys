import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import option from '../cascader-address-options';
@Component({
    selector: 'thy-cascader-selectchanged-example',
    templateUrl: './select-changed.component.html'
})
export class ThyCascaderSelectChangedExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public areaCode1: any[] = [];

    public values: any[] = [];

    public multipleValues: any[] = [];

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = [...option];
        this.areaCode1 = JSON.parse(JSON.stringify(option));
    }

    public selectChanges(values: any): void {
        console.log(values);
        this.notifyService.info('select', values);
    }

    public clearChange() {
        this.notifyService.success('Clear');
    }
}
