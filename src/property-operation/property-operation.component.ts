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
    OnDestroy,
    NgZone
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyTranslate } from 'ngx-tethys/core';
import { htmlElementIsEmpty, coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type ThyPropertyOperationTypes = 'primary' | 'success' | 'warning' | 'danger';

@Component({
    selector: 'thy-property-operation',
    templateUrl: './property-operation.component.html'
})
export class ThyPropertyOperationComponent implements OnInit, AfterContentInit, OnDestroy {
    private initialized = false;

    private hostRenderer = useHostRenderer();

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

    @ContentChild('operationIcon') operationIcon: TemplateRef<any>;

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
        this.showClose = coerceBooleanProperty(value);
    }

    // 支持有值时，label不显示
    @Input() set thyLabelHasValue(value: boolean) {
        this.labelHideWhenHasValue = !coerceBooleanProperty(value);
    }

    @Input() set thyLabelHideWhenHasValue(value: boolean) {
        this.labelHideWhenHasValue = coerceBooleanProperty(value);
    }

    @Input()
    set thyType(value: ThyPropertyOperationTypes) {
        this.type = value;
        this.setHostClass();
    }

    @HostBinding('class.active')
    @Input('thyActive')
    active: boolean;

    @HostBinding('class.thy-property-operation-disabled')
    @Input('thyDisabled')
    disabled: boolean;

    private destroy$ = new Subject<void>();

    private setHostClass(first = false) {
        if (!this.initialized && !first) {
            return;
        }
        this.hostRenderer.updateClass(this.type ? [`thy-property-operation-${this.type}`] : []);
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

    constructor(private thyTranslate: ThyTranslate, private elementRef: ElementRef<HTMLElement>, private ngZone: NgZone) {}

    ngOnInit() {
        this.setHostClass(true);

        this.ngZone.runOutsideAngular(() =>
            fromEvent<Event>(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    if (this.disabled || this.thyClick.observers.length === 0) {
                        return;
                    }

                    this.ngZone.run(() => this.thyClick.emit(event));
                })
        );
    }

    ngAfterContentInit() {
        this.setOnlyHasTips(true);
        this.initialized = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    remove($event: Event) {
        $event.stopPropagation();
        this.thyOnRemove.emit($event);
    }
}
