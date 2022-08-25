import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import option from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyCascaderBasicExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = ['12', '1201', '120102'];

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = [...option];
    }

    public selectChanges(values: any): void {
        this.notifyService.info('select', values);
    }
}
