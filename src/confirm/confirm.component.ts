import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThyModalService } from '../modal/modal.service';
import { ConfirmOption, ConfirmButtonsOption } from './confirm-option.interface';

@Component({
    templateUrl: './confirm.component.html'
})
export class ThyConfirmComponent implements OnInit, OnDestroy {

    loading: boolean;

    public title: string;

    public content: string;

    public contentValues: any;

    public buttons: ConfirmButtonsOption;

    private _confirmAction$: any;

    constructor(
        private modalService: ThyModalService,
    ) { }

    ngOnInit() {
        if (this.contentValues) {
            for (const key in this.contentValues) {
                if (this.contentValues.hasOwnProperty(key)) {
                    const _value = this.contentValues[key];
                    this.content = this.content.replace('{{' + key + '}}', _value);
                }
            }
        }
    }

    confirm(): any {
        const _action = this.buttons.confirm.action();
        if (_action && _action.subscribe) {
            this.loading = true;
            this._confirmAction$ = _action.subscribe({
                next: () => {
                    this.closeModal();
                },
                complete: () => {
                    this.loading = false;
                }
            });
        } else {
            this.closeModal();
        }
    }

    closeModal() {
        this.modalService.close();
    }

    ngOnDestroy() {
        if (this._confirmAction$) {
            this._confirmAction$.unsubscribe();
        }
    }
}
