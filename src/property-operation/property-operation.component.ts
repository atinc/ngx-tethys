import {
    Component, HostBinding, ContentChild, TemplateRef, ElementRef,
    Input, Output, AfterContentInit, ViewChild, EventEmitter
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

    _initialized = false;

    @Output() thyOnRemove = new EventEmitter();

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
        if (this._initialized) {
            this._setOnlyHasTips();
        }
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

    _setOnlyHasTips() {
        if (this._value) {
            this._onlyHasTips = false;
        } else if (htmlElementIsEmpty(this.contentElement.nativeElement)) {
            this._onlyHasTips = true;
        } else {
            this._onlyHasTips = false;
        }
    }

    constructor(private thyTranslate: ThyTranslate) {

    }

    ngAfterContentInit() {
        this._setOnlyHasTips();
        this._initialized = true;
    }

    remove($event: Event) {
        $event.stopPropagation();
        this.thyOnRemove.emit($event);
    }
}
