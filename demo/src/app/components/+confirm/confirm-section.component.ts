
import { Component } from '@angular/core';
import { ThyConfirmService } from '../../../../../src/confirm/confirm.service';

@Component({
    selector: 'demo-confirm-section',
    templateUrl: './confirm-section.component.html',
})
export class DemoConfirmSectionComponent {

    title = '我的项目';

    constructor(
        private confirmService: ThyConfirmService
    ) { }

    deleteConfirm() {
        this.confirmService.show({
            title: '确认删除',
            content: '确认删除项目<code>aaa</code>',
            buttons: {
                confirm: {
                    text: '确认',
                    loadingText: '',
                    action: () => {

                    }
                }
            }
        });
    }

    deleteConfirmSync() {
        this.confirmService.show({
            title: '确认删除',
            content: '确认删除项目<code>aaa</code>',
            buttons: {
                confirm: {
                    text: '确认',
                    loadingText: '',
                    action: () => {
                        return;
                    }
                }
            }
        });
    }

}
