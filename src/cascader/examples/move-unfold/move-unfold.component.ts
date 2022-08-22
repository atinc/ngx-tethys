import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import option from '../cascader-address-options';
@Component({
    selector: 'thy-cascader-move-unfold-example',
    templateUrl: './move-unfold.component.html'
})
export class ThyCascaderMoveUnfoldExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = [...option];
    }

    public selectChanges(values: any): void {
        this.notifyService.info('select', values);
    }
}
