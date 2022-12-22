import { ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-message-close-example',
    templateUrl: './close.component.html'
})
export class ThyMessageCloseExampleComponent implements OnInit {
    openedMessageId: string;

    constructor(private messageService: ThyMessageService) {}

    ngOnInit() {}

    showHasDetail() {
        const messageRef = this.messageService.show({
            id: 'errorId',
            type: 'error',
            content: '获取数据失败！',
            duration: 0
        });

        messageRef.onClose.subscribe(flag => {
            console.log('errorId 被关闭了');
        });
    }

    removeMessageById() {
        this.messageService.remove('errorId');
    }
}
