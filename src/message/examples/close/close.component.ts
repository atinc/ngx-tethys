import { ThyMessageRef, ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit, inject } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-message-close-example',
    templateUrl: './close.component.html',
    imports: [ThySpace, ThySpaceItemDirective, ThyButton]
})
export class ThyMessageCloseExampleComponent implements OnInit {
    private messageService = inject(ThyMessageService);

    openedMessageId: string;

    messageRef: ThyMessageRef;

    ngOnInit() {}

    showHasDetail() {
        this.messageRef = this.messageService.error('获取数据失败！', {
            duration: 0,
            hostClass: 'test'
        });

        this.messageRef.afterClosed().subscribe(() => {
            console.log(`message ${this.messageRef.id} 被关闭了`);
        });
    }

    removeMessageById() {
        this.messageRef.close();
    }
}
