import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import options from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-multiple-example',
    templateUrl: './multiple.component.html'
})
export class ThyCascaderMultipleExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = JSON.parse(JSON.stringify(options));
    }

    public selectChanges(values: any): void {
        this.notifyService.info('selected Value is', values);
    }
}
