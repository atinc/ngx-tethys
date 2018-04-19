
import { Component } from '@angular/core';
import { ThyConfirmService } from '../../../../../src/confirm/confirm.service';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { tap, delay } from 'rxjs/operators';

@Component({
    selector: 'demo-confirm-section',
    templateUrl: './confirm-section.component.html',
})
export class DemoConfirmSectionComponent {


    constructor(
        private confirmService: ThyConfirmService
    ) { }

    deleteConfirm() {
        this.confirmService.show({
            title: '确认删除',
            content: '确认删除项目 <code>aaa</code> 吗？',
            buttons: {
                confirm: {
                    text: '确认',
                    type: 'danger',
                    action: () => {
                        alert('异步confirm');
                    }
                }
            }
        });
    }

    deleteConfirmSync() {
        this.confirmService.show({
            title: '确认删除',
            content: '确认删除项目 <code>aaa</code> 吗？',
            buttons: {
                confirm: {
                    text: '确认',
                    type: 'danger',
                    loadingText: '删除中...',
                    action: () => {
                        return of([1]).pipe(
                            delay(2000),
                            tap({
                                complete: () => {

                                }
                            })
                        );
                    }
                }
            }
        });
    }

}
