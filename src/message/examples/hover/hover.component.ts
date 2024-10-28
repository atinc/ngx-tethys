import { ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit, inject } from '@angular/core';

@Component({
    selector: 'thy-message-hover-example',
    templateUrl: './hover.component.html'
})
export class ThyMessageHoverExampleComponent implements OnInit {
    private messageService = inject(ThyMessageService);

    ngOnInit() {}

    showHoverClose() {
        this.messageService.success('添加项目成功！', {
            pauseOnHover: false
        });
    }
}
