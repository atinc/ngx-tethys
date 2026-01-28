import { ThyMessageService } from 'ngx-tethys/message';
import { Component, TemplateRef, inject, viewChild } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-message-custom-content-example',
    templateUrl: './custom-content.component.html',
    imports: [ThySpace, ThySpaceItemDirective, ThyButton]
})
export class ThyMessageCustomContentExampleComponent {
    private messageService = inject(ThyMessageService);

    contentTemplate = viewChild<TemplateRef<any>>('content');

    showWithString() {
        this.messageService.success('content is string！');
    }

    showWithTemplateRef() {
        this.messageService.success(this.contentTemplate()!);
    }

    openAction = () => {
        alert('Hello World');
    };
}
