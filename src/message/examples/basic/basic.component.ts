import { Component, OnInit, inject } from '@angular/core';
import { ThyMessageService } from 'ngx-tethys/message';

@Component({
    selector: 'thy-message-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyMessageBasicExampleComponent implements OnInit {
    private messageService = inject(ThyMessageService);

    ngOnInit() {}

    showInfo() {
        this.messageService.info('This is a normal message');
    }

    showSuccess() {
        this.messageService.success('This is a success message');
    }

    showError() {
        this.messageService.error('This is a error message');
    }

    showWarning() {
        this.messageService.warning('This is a warning message');
    }

    showLoading() {
        this.messageService.loading('loading...');
    }
}
