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
    ViewChild,
    HostListener
} from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { ThyTranslate } from '../shared/translate';
import { htmlElementIsEmpty, inputValueToBoolean } from '../util/helpers';

type ThyPropertyOperationTypes = 'primary' | 'success' | 'warning' | 'danger';

@Component({
    selector: 'thy-property-operation',
    templateUrl: './property-operation.component.html',
    providers: [UpdateHostClassService]
})
export class ThyPropertyOperationComponent implements OnInit, AfterContentInit {
    private initialized = false;

    labelText: string;

    onlyHasTips = false;

    showClose = false;

    type: ThyPropertyOperationTypes;

    icon: string;

    value: string;

    labelHideWhenHasValue = false;

    @Output() thyOnRemove = new EventEmitter();

    @Output() thyClick = new EventEmitter<Event>();

    @HostBinding('class.thy-property-operation') _isPropertyOperation = true;

    @HostBinding('class.thy-property-operation-disabled') get isPropertyOperationDisabled() {
        return this.disabled;
    }

    @ContentChild('operationIcon', { static: true }) operationIcon: TemplateRef<any>;

    @ViewChild('contentElement', { static: true }) contentElement: ElementRef;

    @Input()
    set thyLabelText(value: string) {
        this.labelText = value;
    }

    @Input()
    set thyValue(value: string) {
        this.value = value;
        this.setOnlyHasTips();
    }

    @Input()
    set thyLabelTextTranslateKey(value: string) {
        this.labelText = this.thyTranslate.instant(value);
    }

    @Input()
    set thyIcon(value: string) {
        this.icon = value;
    }

    @Input()
    set thyShowClose(value: boolean) {
        this.showClose = inputValueToBoolean(value);
    }

    // 支持有值时，label不显示
    @Input() set thyLabelHasValue(value: boolean) {
        this.labelHideWhenHasValue = !inputValueToBoolean(value);
    }

    @Input() set thyLabelHideWhenHasValue(value: boolean) {
        this.labelHideWhenHasValue = inputValueToBoolean(value);
    }

    @Input()
    set thyType(value: ThyPropertyOperationTypes) {
        this.type = value;
        this.setHostClass();
    }

    @HostBinding('class.thy-property-operation-disabled')
    @Input('thyDisabled')
    disabled: boolean;

    private setHostClass(first = false) {
        if (!this.initialized && !first) {
            return;
        }
        this.updateHostClassService.updateClass(this.type ? [`thy-property-operation-${this.type}`] : []);
    }

    private setOnlyHasTips(first = false) {
        if (!this.initialized && !first) {
            return;
        }
        if (this.value) {
            this.onlyHasTips = false;
        } else if (htmlElementIsEmpty(this.contentElement.nativeElement)) {
            this.onlyHasTips = true;
        } else {
            this.onlyHasTips = false;
        }
    }

    constructor(
        private thyTranslate: ThyTranslate,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
        this.setHostClass(true);
    }

    @HostListener('click', ['$event'])
    onclick(event: Event) {
        if (!this.disabled) {
            this.thyClick.emit(event);
        }
    }

    ngAfterContentInit() {
        this.setOnlyHasTips(true);
        this.initialized = true;
    }

    remove($event: Event) {
        $event.stopPropagation();
        this.thyOnRemove.emit($event);
    }
}
