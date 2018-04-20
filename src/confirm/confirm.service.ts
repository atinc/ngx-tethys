import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ThyConfirmComponent } from './confirm.component';
import { ThyButtonType } from '../button/button.component';
import { ConfirmOption } from './confirm-option.interface';
import { ThyModalService } from '../modal/modal.service';


@Injectable()
export class ThyConfirmService {

    private _option: ConfirmOption;

    constructor(
        private modalService: ThyModalService
    ) { }

    show(option: ConfirmOption) {
        this._option = option;
        this.modalService.show(ThyConfirmComponent, {
            initialState: this._option
        });
    }
}
