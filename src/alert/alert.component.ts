import { Component, Input, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { helpers } from '../util';
import { Dictionary } from '../typings';

type ThyAlertType = 'success' | 'warning' | 'danger' | 'info' | 'primary-week' | 'danger-strong' | 'secondary-strong';

@Component({
    selector: 'thy-alert',
    templateUrl: './alert.component.html'
})
export class ThyAlertComponent implements OnInit {
    @Input() thyType: ThyAlertType = 'info';

    @Input() thyMessage: string;

    @Input()
    set thyIcon(value: boolean | string) {
        if (value) {
            this._showIcon = true;
            this._icon = helpers.isString(value) ? value.toString() : null;
        } else {
            this._showIcon = false;
        }
    }

    get thyIcon() {
        if (this._showIcon) {
            return this._icon || this._typeIcon[this.thyType];
        } else {
            return null;
        }
    }

    @ContentChild('operation') alertOperation: TemplateRef<any>;

    // @ViewChild(TemplateRef) content: TemplateRef<any>;

    private _typeIcon: Dictionary<string> = {
        success: 'check-circle-fill',
        warning: 'waring-fill',
        danger: 'close-circle-fill',
        info: 'minus-circle-fill',
        'primary-week': 'question-circle-fill',
        'danger-strong': 'waring'
    };

    private _showIcon = true;

    private _icon: string;

    constructor() {}

    ngOnInit() {}
}
