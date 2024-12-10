import { Component, HostBinding, inject } from '@angular/core';
import { ThyDialogRef } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-sidebar-content-example',
    templateUrl: './dialog-sidebar.component.html',
    standalone: false
})
export class ThyDialogSidebarContentExampleComponent {
    private thyDialogRef = inject<ThyDialogRef<any>>(ThyDialogRef);

    @HostBinding('class.thy-dialog-content') class = true;

    configs = [
        {
            name: '苹果',
            type: 'apple',
            title: '🍎'
        },
        {
            name: '西瓜',
            type: 'watermelon',
            title: '🍉'
        },
        {
            name: '草莓',
            type: 'strawberry',
            title: '🍓'
        },
        {
            name: '蔬菜',
            type: 'vegetables',
            title: '🥗'
        },
        {
            name: '肉',
            type: 'meet',
            title: '🍖'
        }
    ];

    currentConfig = this.configs[0];

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
