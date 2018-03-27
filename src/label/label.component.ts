import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

export type ThyLabelType = 'label' | 'list-status' | 'label-spec';

const labelTypeClassesMap: any = {
    'label': 'label',
    'list-status': 'list-status',
    'label-spec': 'label-spec'
};

@Component({
    selector: 'thy-label',
    templateUrl: './label.component.html'
})

export class ThyLabelComponent implements OnInit {

    @Input() thyStyle: string;
    @Input() thyText: string;
    @Input() thyExtend: string;

    private _labelType: string;

    labelClass?: string;
    labelText?: string;

    constructor() {
        this.labelClass = '';
        this.labelText = '';
    }

    ngOnInit() {
        this._getClassesByLabel();
        this._getLabelText();
    }

    @Input()
    set thyClassify(value: ThyLabelType) {
        this._labelType = value;
        this._getClassesByLabel();
    }

    private _getClassesByLabel() {
        let className = '';
        if (labelTypeClassesMap[this._labelType]) {
            className = labelTypeClassesMap[this._labelType];
            if (this._labelType == 'list-status') {
                this.labelClass = this.thyStyle ? `${className} ${this.thyStyle}` : `${className}`;
            } else {
                this.labelClass = this.thyStyle ? `${className} ${className}-${this.thyStyle}` : `${className}`;
            }
            console.log(this.labelClass);
        } else {
            console.error(`${this._labelType} is not support`);
        }
        if(this.thyExtend){
            this.labelClass=`${this.labelClass} ${this.thyExtend}`;
        }
    }

    private _getLabelText(): void {
        if (this.thyText) {
            this.labelText = this.thyText;
        }
    }
}
