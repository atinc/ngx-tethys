import { ThyMessageRef, ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-message-close-example',
    templateUrl: './close.component.html'
})
export class ThyMessageCloseExampleComponent implements OnInit {
    openedMessageId: string;

    messageRef: ThyMessageRef;

    constructor(private messageService: ThyMessageService) {}

    ngOnInit() {}

    showHasDetail() {
        this.messageRef = this.messageService.error('获取数据失败！', {
            duration: 0
        });

        this.messageRef.afterClosed().subscribe(() => {
            console.log(`message ${this.messageRef.id} 被关闭了`);
        });
    }

    removeMessageById() {
        this.messageRef.close();
    }
}
