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
    NgZone,
    booleanAttribute
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyTranslate } from 'ngx-tethys/core';
import { htmlElementIsEmpty, coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { NgTemplateOutlet, NgIf, NgClass } from '@angular/common';

type ThyPropertyOperationTypes = 'primary' | 'success' | 'warning' | 'danger';

/**
 * 属性操作组件
 * @name thy-property-operation
 * @order 10
 */
@Component({
    selector: 'thy-property-operation',
    templateUrl: './property-operation.component.html',
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, ThyButtonIcon, ThyFlexibleText, ThyIcon]
})
export class ThyPropertyOperation implements OnInit, AfterContentInit, OnDestroy {
    private initialized = false;

    private hostRenderer = useHostRenderer();

    labelText: string;

    onlyHasTips = false;

    showClose = false;

    type: ThyPropertyOperationTypes;

    icon: string;

    value: string;

    labelHideWhenHasValue = false;

    /**
     * 点击移除图标时的事件回调，此函数只有在thyShowClose为true时才会发生
     */
    @Output() thyOnRemove = new EventEmitter();

    /**
     * 点击事件回调
     */
    @Output() thyClick = new EventEmitter<Event>();

    @HostBinding('class.thy-property-operation') _isPropertyOperation = true;

    @ContentChild('operationIcon') operationIcon: TemplateRef<any>;

    @ViewChild('contentElement', { static: true }) contentElement: ElementRef;

    /**
     * 属性的 Label 文本
     */
    @Input()
    set thyLabelText(value: string) {
        this.labelText = value;
    }

    /**
     * 属性的值
     */
    @Input()
    set thyValue(value: string) {
        this.value = value;
        this.setOnlyHasTips();
    }

    /**
     * 属性的 Label Translate Key
     */
    @Input()
    set thyLabelTextTranslateKey(value: string) {
        this.labelText = this.thyTranslate.instant(value);
    }

    /**
     * 图标
     */
    @Input()
    set thyIcon(value: string) {
        this.icon = value;
    }

    /**
     * 当有属性值时是否展示移除图标
     * @default false
     */
    @Input({ transform: booleanAttribute })
    set thyShowClose(value: boolean) {
        this.showClose = coerceBooleanProperty(value);
    }

    // 支持有值时，label不显示
    @Input({ transform: booleanAttribute })
    set thyLabelHasValue(value: boolean) {
        this.labelHideWhenHasValue = !coerceBooleanProperty(value);
    }

    /**
     * 有值时隐藏 label
     * @default false
     */
    @Input({ transform: booleanAttribute })
    set thyLabelHideWhenHasValue(value: boolean) {
        this.labelHideWhenHasValue = coerceBooleanProperty(value);
    }

    /**
     * 属性类型
     * @type  danger | primary | success | warning | null
     * @default null
     */
    @Input()
    set thyType(value: ThyPropertyOperationTypes) {
        this.type = value;
        this.setHostClass();
    }

    /**
     * 激活状态
     * @default false
     */
    @HostBinding('class.active')
    @Input({ alias: 'thyActive', transform: booleanAttribute })
    active: boolean;

    /**
     * 禁用操作，添加后property operation中thyClick和thyOnRemove事件将会被禁用
     * @default false
     */
    @HostBinding('class.thy-property-operation-disabled')
    @Input({ alias: 'thyDisabled', transform: booleanAttribute })
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
