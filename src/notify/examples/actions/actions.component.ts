import { Component, inject, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-notify-actions-example',
    templateUrl: './actions.component.html',
    imports: [ThyButton]
})
export class ThyNotifyActionsExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    constructor() {}

    ngOnInit() {}

    showNotify() {
        this.notifyService.show({
            type: 'success',
            title: '添加项目成功！',
            content: '您已成功添加一个新的项目。',
            duration: 0,
            detail: {
                link: '查看',
                content: '这是一个详细的描述信息。'
            },
            actions: [
                {
                    text: '打开',
                    icon: 'publish',
                    onClick: () => {
                        window.open('https://www.baidu.com');
                    }
                },
                {
                    text: '最小化',
                    icon: 'underline-pushpin',
                    onClick: () => {
                        location.reload();
                    }
                },
                {
                    text: '关闭',
                    icon: 'close',
                    onClick: () => {}
                }
            ]
        });
    }
}
