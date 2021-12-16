import { Component, Input, OnInit, ContentChild, TemplateRef, HostBinding } from '@angular/core';
import { isString } from 'ngx-tethys/util';
import { Dictionary } from 'ngx-tethys/types';

type ThyAlertType = 'success' | 'warning' | 'danger' | 'info' | 'primary-weak' | 'success-weak' | 'warning-weak' | 'danger-weak';

@Component({
    selector: 'thy-alert',
    templateUrl: './alert.component.html'
})
export class ThyAlertComponent implements OnInit {
    @HostBinding('class') class: string;

    messageTemplate: TemplateRef<HTMLElement>;

    messageText: string;

    @Input() set thyType(value: ThyAlertType) {
        this._type = value;
    }

    @Input() set thyMessage(value: string | TemplateRef<HTMLElement>) {
        if (value instanceof TemplateRef) {
            this.messageTemplate = value;
        } else {
            this.messageText = value;
        }
    }

    @Input()
    set thyIcon(value: boolean | string) {
        if (value) {
            this._showIcon = true;
            this._icon = isString(value) ? value.toString() : null;
        } else {
            this._showIcon = false;
        }
    }

    get thyIcon() {
        if (this._showIcon) {
            return this._icon || this._typeIcon[this._type];
        } else {
            return null;
        }
    }

    @Input() thyCloseable: boolean;

    @ContentChild('operation') alertOperation: TemplateRef<any>;

    // @ViewChild(TemplateRef) content: TemplateRef<any>;

    private _typeIcon: Dictionary<string> = {
        success: 'check-circle-fill',
        warning: 'waring-fill',
        danger: 'close-circle-fill',
        info: 'minus-circle-fill',
        'primary-weak': 'question-circle-fill',
        'success-weak': 'check-circle-fill',
        'warning-weak': 'waring-fill',
        'danger-weak': 'close-circle-fill'
    };

    private _showIcon = true;

    private _icon: string;

    private _type: ThyAlertType = 'info';

    constructor() {}

    ngOnInit() {
        this.class = `thy-alert thy-alert-${this._type}`;
    }

    closeAlert() {
        this.class = `${this.class} thy-alert-hidden`;
    }
}
