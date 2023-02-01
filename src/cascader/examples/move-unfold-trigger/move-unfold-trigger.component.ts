import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';
@Component({
    selector: 'thy-cascader-move-unfold-trigger-example',
    templateUrl: './move-unfold-trigger.component.html'
})
export class ThyCascaderMoveUnfoldTriggerExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
