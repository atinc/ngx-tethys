import { Component, HostBinding } from '@angular/core';
import { ThyDialogRef } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-sidebar-content-example',
    templateUrl: './dialog-sidebar.component.html'
})
export class ThyDialogSidebarContentExampleComponent {
    @HostBinding('class.thy-dialog-content') class = true;

    configs = [
        {
            name: '基本设置',
            type: 'basic',
            title: '基本设置'
        },
        {
            name: '访问设置',
            type: 'access',
            title: '访问设置'
        },
        {
            name: '工单设置',
            type: 'tickets',
            title: '工单设置'
        },
        {
            name: '组件设置',
            type: 'components',
            title: '组件设置'
        },
        {
            name: '展示设置',
            type: 'display',
            title: '展示设置'
        }
    ];

    currentConfig = this.configs[0];

    constructor(private thyDialogRef: ThyDialogRef<any>) {}

    close() {
        this.thyDialogRef.close();
    }

    ok() {
        this.thyDialogRef.close();
    }

    configChange(config: any) {
        this.currentConfig = config;
    }
}
