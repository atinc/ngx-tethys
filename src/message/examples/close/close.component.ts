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
        const messageRef = this.messageService.error('获取数据失败！', {
            id: 'errorId',
            duration: 0
        });

        messageRef.afterClosed().subscribe(flag => {
            console.log('errorId 被关闭了');
        });
    }

    removeMessageById() {
        this.messageService.remove('errorId');
    }
}
