import { Component, OnInit, Input, ContentChild, TemplateRef, ContentChildren, QueryList, } from '@angular/core';
import { ThySelectCustomComponent } from './select-custom.component';
import { UpdateHostClassService } from '../shared';
import { helpers } from '../util';

@Component({
    selector: 'thy-option-list',
    templateUrl: './option-list.component.html'
})
export class ThyOptionListComponent implements OnInit {

    @Input() option: any;

    constructor(
        public parent: ThySelectCustomComponent,
        private updateHostClassService: UpdateHostClassService
    ) {

    }

    ngOnInit() {
    }

    selectedOption(option: any) {
        if (option.thyDisabled) {
            return;
        }
        if (this.parent._mode === 'multiple') {
            if (this.parent._innerValues.length > 0) {
                const _index = this.parent._innerValues.findIndex((item: any) => {
                    return item.thyValue === option.thyValue;
                });
                if (_index === -1) {
                    option.selected = true;
                    this.parent._innerValues.push(option);
                } else {
                    option.selected = false;
                    this.parent._innerValues.splice(_index, 1);
                }
            } else {
                option.selected = true;
                this.parent._innerValues.push(option);
            }
            this.parent.valueOnChange(this.parent._innerValues);
        } else {
            this.parent._innerValue = option;
            this.parent._expandOptions = false;
            this.parent.valueOnChange(this.parent._innerValue.thyValue);
        }
    }
}

