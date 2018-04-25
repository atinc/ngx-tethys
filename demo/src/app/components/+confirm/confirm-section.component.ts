
import { Component } from '@angular/core';
import { ThyConfirmService } from '../../../../../src/confirm/confirm.service';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'demo-confirm-section',
    templateUrl: './confirm-section.component.html',
})
export class DemoConfirmSectionComponent {


    constructor(
        private confirmService: ThyConfirmService
    ) { }

    deleteSimplyConfirm() {
        this.confirmService.delete(null, '确认删除项目 <code>6.0迭代开发</code> 吗？text', () => {
            console.log(1);
        });
    }
    deleteSimplyConfirmTranslate() {
        this.confirmService.deleteTranslateKey(
            null, {
                content: 'common.confirm.CONTENT',
                params: {
                    name: '6.0迭代开发'
                }
            }, () => {
                return of([1]).pipe(
                    delay(2000),
                    tap({
                        complete: () => {

                        }
                    })
                );
            }
        );
    }

    show() {
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

    showSync() {
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
