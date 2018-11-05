
import { Component } from '@angular/core';
import { ThyConfirmService } from '../../../../../src/confirm/confirm.service';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'demo-confirm-section',
    templateUrl: './confirm-section.component.html',
})
export class DemoConfirmSectionComponent {

    apiParameters = [
        {
            property: 'title',
            description: '标题',
            type: 'String',
            default: ''
        }, {
            property: 'content',
            description: '内容',
            type: 'String',
            default: ''
        }, {
            property: 'buttons',
            description: '按钮',
            type: 'Object',
            default: ''
        }, {
            property: 'buttons.confirm',
            description: '确认按钮',
            type: 'Object',
            default: ''
        }, {
            property: 'buttons.confirm.text',
            description: '确认按钮-显示文本',
            type: 'String',
            default: ''
        }, {
            property: 'buttons.confirm.type',
            description: '确认按钮-样式',
            type: 'ThyButtonType',
            default: ''
        }, {
            property: 'buttons.confirm.loadingText',
            description: '确认按钮-处理中显示文本',
            type: 'String',
            default: ''
        }, {
            property: 'buttons.confirm.action',
            description: '确认按钮-处理事件',
            type: 'Function',
            default: ''
        },
    ];


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
                    loadingText: '删除自定义文案...',
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
