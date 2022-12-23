import { ThyMessageService } from 'ngx-tethys/message';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThyMessageContentExampleComponent } from './content.component';

@Component({
    selector: 'thy-message-custom-content-example',
    templateUrl: './custom-content.component.html'
})
export class ThyMessageCustomContentExampleComponent implements OnInit {
    @ViewChild('content', { static: true }) contentTemplate: TemplateRef<any>;

    constructor(private messageService: ThyMessageService) {}

    ngOnInit() {}

    showWithString() {
        this.messageService.success('content is string！');
    }

    showWithTemplateRef() {
        this.messageService.success(this.contentTemplate, {
            contentInitialState: {
                $implicit: '自定义模板',
                content: '内容...'
            }
        });
    }

    showWithComponent() {
        this.messageService.success(ThyMessageContentExampleComponent, {
            contentInitialState: {
                title: '自定义组件'
            }
        });
    }

    openAction = () => {
        alert('Hello World');
    };
}
