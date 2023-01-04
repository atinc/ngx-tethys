import { ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
                $implicit: '标题111',
                content: '这是内容...'
            }
        });
    }

    showWithComponent() {
        this.messageService.success(ThyMessageContentExampleComponent, {
            contentInitialState: {
                title: '标题11'
            }
        });
    }

    openAction = () => {
        alert('Hello World');
    };
}
