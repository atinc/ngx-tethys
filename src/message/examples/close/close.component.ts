import { ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-message-close-example',
    templateUrl: './close.component.html'
})
export class ThyMessageCloseExampleComponent implements OnInit {
    constructor(private messageService: ThyMessageService) {}

    ngOnInit() {}

    showHasDetail() {
        this.messageService.show({
            id: 'errorId',
            type: 'error',
            content: '获取数据失败！',
            duration: 0
        });
    }

    removeMessageById() {
        this.messageService.removeMessageById('errorId');
    }
}
