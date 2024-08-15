import { finalize } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyDialog } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-form-dialog-example',
    templateUrl: './dialog.component.html'
})
export class ThyFormDialogExampleComponent implements OnInit {
    model = {
        projectName: '',
        role: 1
    };

    validatorConfig = {
        validationMessages: {
            projectName: {
                required: 'Project name is required.'
            }
        }
    };

    saving = false;

    constructor(
        public dialog: ThyDialog,
        private notifyService: ThyNotifyService
    ) {}

    ngOnInit(): void {}

    openDialogForm(template: TemplateRef<HTMLElement>) {
        this.dialog.open(template);
    }

    submit() {
        this.saving = true;
        timer(1000)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notifyService.success(`Project create success`);
                console.log(`dialog form submit success!`);
                this.dialog.close();
            });
    }

    close() {
        this.dialog.close();
    }
}
