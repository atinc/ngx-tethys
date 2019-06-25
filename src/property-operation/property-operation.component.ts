import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { ThyTranslate } from '../shared/translate';
import { htmlElementIsEmpty, inputValueToBoolean } from '../util/helpers';

export enum ThyPropertyOperationTypes {
    danger = 'danger'
}

@Component({
    selector: 'thy-property-operation',
    templateUrl: './property-operation.component.html',
    providers: [UpdateHostClassService]
})
export class ThyPropertyOperationComponent implements OnInit, AfterContentInit {
    _labelText: string;

    _icon: string;

    _value: string;

    _onlyHasTips = false;

    _showClose = false;

    _initialized = false;

    type: ThyPropertyOperationTypes;

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

    // 支持有值时，label不显示
    @Input() thyLabelHasValue = true;

    @Input()
    set thyType(value: ThyPropertyOperationTypes) {
        this.type = value;
        if (this._initialized) {
            this.setTypeStyleClass();
        }
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

    constructor(
        private thyTranslate: ThyTranslate,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
        this.setTypeStyleClass();
    }

    private setTypeStyleClass() {
        this.updateHostClassService.removeClass('thy-property-operation-danger');
        switch (this.type) {
            case ThyPropertyOperationTypes.danger:
                this.updateHostClassService.addClass('thy-property-operation-danger');
                break;
        }
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
