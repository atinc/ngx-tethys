import { Component, forwardRef, OnInit, input, viewChild, model, signal , ElementRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty, elementMatchClosest } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';
import { SafeAny } from 'ngx-tethys/types';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const noop = () => {};

/**
 * 下拉选择
 * @name thy-native-select
 * @order 20
 */
@Component({
    selector: 'thy-native-select',
    templateUrl: './native-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyNativeSelect),
            multi: true
        }
    ],
    imports: [ThyInputDirective, FormsModule, ThyIcon],
    host: {
        class: 'thy-select',
        '[attr.tabindex]': 'tabIndex',
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    }
})
export class ThyNativeSelect extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor, OnInit {
    readonly selectElement = viewChild.required<ElementRef<any>>('select');

    readonly innerValue = model<SafeAny>(null);

    readonly disabled = signal<boolean>(false);

    private hostRenderer = useHostRenderer();

    readonly thySize = input<InputSize>();

    readonly name = input<string>();

    readonly thyAllowClear = input(false, { transform: coerceBooleanProperty });

    writeValue(obj: any): void {
        if (obj !== this.innerValue()) {
            this.innerValue.set(obj);
        }
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    constructor() {
        super();
    }

    ngModelChange() {
        this.onChangeFn(this.innerValue());
        this.onTouchedFn();
    }

    ngOnInit() {
        const size = this.thySize();
        const classes = size ? [`thy-select-${size}`] : [];
        this.hostRenderer.updateClass(classes);
    }

    onBlur(event: FocusEvent) {
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, 'thy-native-select')) {
            return;
        }
        this.onTouchedFn();
    }

    onFocus(event?: Event) {
        this.selectElement().nativeElement.focus();
    }

    clearSelectValue(event: Event) {
        event.stopPropagation();
        this.innerValue.set('');
        this.onChangeFn(this.innerValue());
    }
}
