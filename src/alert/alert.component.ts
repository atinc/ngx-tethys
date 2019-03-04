import { Component, Input, HostBinding, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { helpers } from '../util';
import { Dictionary } from '../typings';
@Component({
    selector: 'thy-alert',
    templateUrl: './alert.component.html'
})

export class ThyAlertComponent implements OnInit {

    @Input() thyType = 'info';

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

    // @ViewChild(TemplateRef) content: TemplateRef<any>;

    private _typeIcon: Dictionary<string> = {
        success: 'wtf-completed-circle',
        warning: 'wtf-unselected-o',
        danger: 'wtf-times-circle',
        info: 'wtf-task',
    };

    private _showIcon = true;

    private _icon: string;

    constructor() { }

    ngOnInit() {
    }
}
