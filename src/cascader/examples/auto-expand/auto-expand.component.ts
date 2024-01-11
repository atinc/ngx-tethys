import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCascaderComponent } from 'ngx-tethys/cascader';
import { ThyFormGroupComponent } from 'ngx-tethys/form';
import { clone, options } from '../cascader-address-options';
import { ThyNotifyService } from 'ngx-tethys/notify';

@Component({
    selector: 'thy-cascader-auto-expand-example',
    templateUrl: './auto-expand.component.html',
    standalone: true,
    imports: [ThyFormGroupComponent, ThyCascaderComponent, CommonModule, FormsModule]
})
export class AutoExpandComponent implements OnInit {
    public areaCode = clone(options);

    public singleValues: any[] = ['12', '1201', '120102'];

    public multipleValues: any[] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    public isShow: boolean;

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
