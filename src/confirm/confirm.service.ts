import { Injectable, TemplateRef } from '@angular/core';
import { ThyConfirmComponent } from './confirm.component';
import { ThyButtonType } from '../button/button.component';
import { ConfirmOption, ContentKeyParams } from './confirm-option.interface';
import { ThyModalService } from '../modal/modal.service';
import { ThyTranslate } from '../shared';
import { isObject } from '../util/helpers';
import { warnDeprecation } from '../core/logger';

@Injectable()
export class ThyConfirmService {
    private _option: ConfirmOption;

    constructor(private modalService: ThyModalService, private translate: ThyTranslate) {}

    /**
     * @deprecated The ThyConfirm will be deprecated, please use ThyDialog.confirm.
     */
    show(option: ConfirmOption) {
        warnDeprecation(`The ThyConfirm will be deprecated, please use ThyDialog.confirm.`);

        this.modalService.show(ThyConfirmComponent, {
            initialState: this._formatOption(option)
        });
    }

    delete(title: string, content: string, action: Function) {
        let _deleteOption: ConfirmOption;
        _deleteOption = {
            content: content,
            buttons: {
                confirm: {
                    type: 'danger',
                    action: action
                }
            }
        };
        if (title) {
            _deleteOption.title = title;
        }
        this.show(_deleteOption);
    }

    deleteTranslateKey(titleKey: string, contentKey: ContentKeyParams | string, action: Function) {
        let title = null,
            content = null;
        if (titleKey) {
            title = this.translate.instant(titleKey);
        }
        if (isObject(contentKey)) {
            contentKey = <ContentKeyParams>contentKey;
            content = this.translate.instant(contentKey.content, contentKey.params);
        } else {
            contentKey = <string>contentKey;
            content = this.translate.instant(contentKey);
        }
        this.delete(title, content, action);
    }

    private _formatOption(option: ConfirmOption) {
        let _defaultOption: ConfirmOption;
        _defaultOption = {
            title: this.translate.instant('common.DELETE_CONFIRM'),
            content: this.translate.instant('common.confirm.CONTENT_DEFAULT'),
            buttons: {
                confirm: {
                    text: this.translate.instant('common.OK'),
                    loadingText: this.translate.instant('common.DELETING')
                },
                decline: {}
            }
        };
        let _res: ConfirmOption = {
            buttons: {
                confirm: {},
                decline: {}
            }
        };
        _res = Object.assign({}, _defaultOption, option);
        if (option.buttons && option.buttons.confirm) {
            _res.buttons.confirm = Object.assign(
                {},
                _res.buttons.confirm,
                _defaultOption.buttons.confirm,
                option.buttons.confirm
            );
        }
        if (option.buttons && option.buttons.decline) {
            _res.buttons.decline = Object.assign(
                {},
                _res.buttons.decline,
                _defaultOption.buttons.decline,
                option.buttons.decline
            );
        }
        return Object.assign({}, _defaultOption, option);
    }
}
