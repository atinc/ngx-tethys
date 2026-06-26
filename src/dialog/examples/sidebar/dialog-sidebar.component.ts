import { Component, HostBinding, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyDialogRef } from 'ngx-tethys/dialog';
import { ThyLayout, ThySidebar, ThySidebarHeader, ThySidebarContent } from 'ngx-tethys/layout';
import { ThyMenu } from 'ngx-tethys/menu';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dialog-sidebar-content-example',
    templateUrl: './dialog-sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ThyLayout,
        ThySidebar,
        ThySidebarHeader,
        ThySidebarContent,
        ThyMenu,
        ThyDialogHeader,
        ThyDialogBody,
        ThyDialogFooter,
        ThyButton
    ]
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
