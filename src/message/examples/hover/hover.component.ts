import { ThyMessageService } from 'ngx-tethys/message';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-message-hover-example',
    templateUrl: './hover.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton]
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
