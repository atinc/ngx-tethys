import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThyNotifyContentExampleComponent } from './content.component';

@Component({
    selector: 'thy-notify-custom-content-example',
    templateUrl: './custom-content.component.html'
})
export class ThyNotifyCustomContentExampleComponent implements OnInit {
    @ViewChild('content', { static: true }) contentTemplate: TemplateRef<any>;

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showWithString() {
        this.notifyService.show({
            type: 'success',
            title: '成功 ',
            content: 'content is string！',
            detail: {
                link: '查看',
                content: '查看内容',
                action: this.openAction
            }
        });
    }

    showWithTemplateRef() {
        this.notifyService.show({
            type: 'success',
            title: '成功 ',
            content: this.contentTemplate,
            detail: '提示信息\n提示信息',
            contentInitialState: {
                $implicit: '标题111',
                content: '这是内容...'
            }
        });
    }

    showWithComponent() {
        this.notifyService.show({
            type: 'success',
            title: '成功 ',
            content: ThyNotifyContentExampleComponent,
            detail: '提示信息',
            contentInitialState: {
                title: '标题111'
            }
        });
    }

    openAction = () => {
        alert('Hello World');
    };
}
