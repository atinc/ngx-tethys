import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';
import { ThyCascader } from 'ngx-tethys/cascader';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-cascader-move-unfold-trigger-example',
    templateUrl: './move-unfold-trigger.component.html',
    imports: [ThyCascader, FormsModule]
})
export class ThyCascaderMoveUnfoldTriggerExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode: any[] = [];

    public values: any[] = [];

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
