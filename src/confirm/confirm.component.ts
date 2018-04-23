import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { ThyModalService } from '../modal/modal.service';
import { ConfirmOption, ConfirmButtonsOption } from './confirm-option.interface';

@Component({
    templateUrl: './confirm.component.html'
})
export class ThyConfirmComponent implements OnDestroy {

    loading: boolean;

    public title: string;

    public content: string;

    public buttons: ConfirmButtonsOption;

    private _confirmAction$: Subscription;

    constructor(
        private modalService: ThyModalService,
    ) { }

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
