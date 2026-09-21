import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2, effect, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyFormControlSize } from 'ngx-tethys/core';

const inputGroupSizeMap = {
    xs: ['form-control-xs'],
    sm: ['form-control-sm'],
    md: ['form-control-md'],
    lg: ['form-control-lg']
};

export type ThyInputAppearance = 'outline' | 'subtle' | 'ghost';

/**
 * 输入框指令
 * @name thyInput
 * @order 10
 */
@Directive({
    selector: 'input[thyInput], select[thyInput], textarea[thyInput]',
    exportAs: 'thyInput',
    host: {
        '[class.form-control-subtle]': 'thyAppearance() === "subtle"',
        '[class.form-control-ghost]': 'thyAppearance() === "ghost"'
    }
})
export class ThyInputDirective {
    private elementRef = inject(ElementRef);
    private render = inject(Renderer2);
    private control = inject(NgControl, { optional: true, self: true })!;

    @HostBinding('class.form-control') isFormControl = true;

    private hostRenderer = useHostRenderer();

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'lg'
     * @default md
     */
    readonly thySize = input<ThyFormControlSize, ThyFormControlSize | null | undefined>('md', {
        transform: value => value ?? 'md'
    });

    /**
     * 输入框外观。`outline`: 灰色边框、白色底，hover/focus 时蓝色边框；`subtle`: 无边框，hover/focus 时蓝色边框；`ghost`: 无边框，hover/focus 时也无边框
     * @type outline | subtle | ghost
     * @default outline
     */
    readonly thyAppearance = input<ThyInputAppearance, ThyInputAppearance | null | undefined>('outline', {
        transform: value => value ?? 'outline'
    });

    get ngControl() {
        return this.control;
    }

    get nativeElement(): HTMLInputElement {
        return this.elementRef.nativeElement;
    }

    constructor() {
        effect(() => {
            const size = this.thySize();
            if (size && inputGroupSizeMap[size]) {
                this.hostRenderer.updateClass(inputGroupSizeMap[size]);
            } else {
                this.hostRenderer.updateClass([]);
            }
        });
    }
}
