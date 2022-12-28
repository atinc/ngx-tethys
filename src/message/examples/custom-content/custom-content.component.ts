import { ThyMessageService } from 'ngx-tethys/message';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

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
        this.messageService.success(this.contentTemplate);
    }

    openAction = () => {
        alert('Hello World');
    };
}
