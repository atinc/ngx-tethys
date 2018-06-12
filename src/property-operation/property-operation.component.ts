import {
    Component, HostBinding, ContentChild, TemplateRef, ElementRef,
    Input, AfterContentInit, ViewChild
} from '@angular/core';
import { ThyTranslate } from '../shared/translate';
import { htmlElementIsEmpty, inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-property-operation',
    templateUrl: './property-operation.component.html'
})
export class ThyPropertyOperationComponent implements AfterContentInit {

    _labelText: string;

    _icon: string;

    _value: string;

    _onlyHasTips = false;

    _showClose = false;
    
    @HostBinding('class.thy-property-operation') _isPropertyOperation = true;

    @ContentChild('operationIcon') operationIcon: TemplateRef<any>;

    @ViewChild('contentElement') contentElement: ElementRef;

    @Input()
    set thyLabelText(value: string) {
        this._labelText = value;
    }

    @Input()
    set thyValue(value: string) {
        this._value = value;
    }

    @Input()
    set thyLabelTranslateKey(value: string) {
        this._labelText = this.thyTranslate.instant(value);
    }

    @Input()
    set thyIcon(value: string) {
        this._icon = value;
    }

    @Input()
    set thyShowClose(value: boolean) {
        this._showClose = inputValueToBoolean(value);
    }

    constructor(private thyTranslate: ThyTranslate) {

    }

    ngAfterContentInit() {
        this._onlyHasTips = htmlElementIsEmpty(this.contentElement.nativeElement) && !this._value;
    }
}
