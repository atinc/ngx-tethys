import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-multiple-example',
    templateUrl: './multiple.component.html',
    standalone: false
})
export class ThyCascaderMultipleExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    private timeout: any;

    public areaCode: any[] = [];

    public values: any[] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected Value is ${values}`);
    }
}
