import { Observable } from 'rxjs';
import { ThyButtonType } from '../button/button.component';

export interface ConfirmOption {

    title?: string;

    content?: string;

    contentValues?: object;

    type?: 'success' | 'error' | 'info' | 'warning';

    ignoreBackdropClick?: boolean;

    buttons: ConfirmButtonsOption;

}

export interface ConfirmButtonsOption {
    confirm: ConfirmButtonsConfirmOption;
    decline?: ConfirmButtonsDeclineOption;
}


export interface ConfirmButtonsConfirmOption {
    text?: string;
    loadingText?: string;
    type?: ThyButtonType;
    action?: Function;
}

export interface ConfirmButtonsDeclineOption {
    hidden?: boolean;
    type?: ThyButtonType;
    action?: Function;
}
