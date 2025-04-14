import { finalize } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyDialog, ThyDialogBody, ThyDialogHeader } from 'ngx-tethys/dialog';
import { ThyFormGroup, ThyFormGroupFooter, ThyFormSubmitDirective, ThyFormDirective } from 'ngx-tethys/form';
import { ThyButton } from 'ngx-tethys/button';
import { CdkScrollable } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-form-dialog-example',
    templateUrl: './dialog.component.html',
    imports: [
        ThyButton,
        ThyDialogHeader,
        CdkScrollable,
        ThyDialogBody,
        FormsModule,
        ThyFormDirective,
        ThyFormGroup,
        ThyInputDirective,
        ThySelect,
        ThyOption,
        ThyFormGroupFooter,
        ThyFormSubmitDirective
    ]
})
export class ThyFormDialogExampleComponent implements OnInit {
    dialog = inject(ThyDialog);
    private notifyService = inject(ThyNotifyService);

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
