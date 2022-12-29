import { ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-message-hover-example',
    templateUrl: './hover.component.html'
})
export class ThyMessageHoverExampleComponent implements OnInit {
    constructor(private messageService: ThyMessageService) {}

    ngOnInit() {}

    showHoverClose() {
        this.messageService.success('添加项目成功！', {
            pauseOnHover: false
        });
    }
}
