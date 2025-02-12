import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-search-example',
    templateUrl: './search.component.html',
    standalone: false
})
export class ThyCascaderSearchExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode: any[] = [];

    public multiAreaCode: any[] = [];

    public value: string[] = ['12', '1201', '120102'];

    public multiValues: string[][] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    ngOnInit() {
        this.areaCode = clone(options);
        this.multiAreaCode = clone(options);
    }

    public selectChanges(value: any): void {
        this.notifyService.info(`selected data is ${value}`);
    }
}
