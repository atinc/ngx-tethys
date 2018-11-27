import { Component, Input, HostBinding, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-alert',
    templateUrl: './alert.component.html'
})

export class ThyAlertComponent implements OnInit {

    // tslint:disable-next-line:no-inferrable-types
    @Input() thyType: string = 'info';

    @Input() thyMessage: string = this.thyType;

    @Input() thyIcon: boolean | string = true;

    // @ViewChild(TemplateRef) content: TemplateRef<any>;

    typeIcon: Object = {
        'success':'wtf-completed-circle',
        'warning':'wtf-unselected-o',
        'danger':'wtf-times-circle',
        'info':'wtf-task',
    };

    alertStateClass: any = {};

    alertIconClass:any = {};

    constructor() {}

    ngOnInit() {
        this.alertStateClass[`thy-alert-${this.thyType}`] = true;
        if (this.thyIcon === true) {
            this.alertIconClass[this.typeIcon[this.thyType]] = true;
        } else {
            this.alertIconClass[<string>this.thyIcon] = true;
        }
    }
}
