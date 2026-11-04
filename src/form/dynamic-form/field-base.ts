import { Directive, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';

/**
 * 自定义动态表单字段适配组件基类。
 * context 通过 thyViewOutlet 注入 field / props / size / invalid / key。
 * 注意：带 [formField] 的节点不要再绑 [name]（Signal Forms NG8022）。
 */
@Directive()
export abstract class ThyDynamicFormFieldBase<TProps = unknown> {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<TProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input<string>('');
}
