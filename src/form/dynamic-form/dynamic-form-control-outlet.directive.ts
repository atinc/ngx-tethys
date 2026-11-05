import {
    ComponentRef,
    Directive,
    effect,
    inject,
    input,
    inputBinding,
    linkedSignal,
    signal,
    Type,
    untracked,
    ViewContainerRef
} from '@angular/core';
import { FormField } from '@angular/forms/signals';

import {
    resolveDynamicFormFieldOutletContext,
    ThyDynamicFormFieldOutletContext,
    ThyDynamicFormFieldType
} from './dynamic-form-field-types';

/** 按字段类型动态创建控件。 */
@Directive({
    selector: '[thyDynamicFormControlOutlet]'
})
export class ThyDynamicFormControlOutlet {
    private readonly viewContainerRef = inject(ViewContainerRef);

    readonly thyDynamicFormControlOutlet = input.required<ThyDynamicFormFieldType>();
    readonly thyDynamicFormControlOutletContext = input.required<ThyDynamicFormFieldOutletContext>();

    private componentRef?: ComponentRef<unknown>;
    private readonly contextSignal = signal<ThyDynamicFormFieldOutletContext | undefined>(undefined);

    private readonly isOutletChanged = linkedSignal({
        source: () => this.thyDynamicFormControlOutlet(),
        computation: (source, previous) => !!(source && previous?.source && source !== previous.source)
    });

    constructor() {
        effect(() => {
            const fieldType = this.thyDynamicFormControlOutlet();
            const context = this.thyDynamicFormControlOutletContext();
            this.contextSignal.set(context);

            const outletChanged = untracked(() => this.isOutletChanged());
            if (!this.componentRef || outletChanged || this.componentRef.componentType !== fieldType.component) {
                this.recreate(fieldType);
                this.isOutletChanged.set(false);
            } else if (fieldType.attachFormField) {
                this.syncHostElement(context);
            } else {
                this.patchComponentInputs(fieldType, context);
            }
        });
    }

    private recreate(fieldType: ThyDynamicFormFieldType): void {
        this.viewContainerRef.clear();
        this.componentRef = undefined;

        const context = () => this.contextSignal()!;
        if (fieldType.attachFormField) {
            const mapped = () => resolveDynamicFormFieldOutletContext(fieldType, context());
            const bindings = Object.keys(untracked(mapped)).map(name => inputBinding(name, () => mapped()[name]));
            this.componentRef = this.viewContainerRef.createComponent(fieldType.component as Type<unknown>, {
                directives: [
                    {
                        type: FormField,
                        bindings: [inputBinding('formField', () => context().field)]
                    }
                ],
                bindings
            });
            this.syncHostElement(context());
            return;
        }

        this.componentRef = this.viewContainerRef.createComponent(fieldType.component as Type<unknown>);
        this.patchComponentInputs(fieldType, context());
    }

    private syncHostElement(context: ThyDynamicFormFieldOutletContext): void {
        const host = this.componentRef?.location.nativeElement as HTMLElement | undefined;
        if (!host) {
            return;
        }
        if (context.key) {
            host.id = context.key;
        }
        host.classList.toggle('is-invalid', context.invalid);
    }

    private patchComponentInputs(fieldType: ThyDynamicFormFieldType, context: ThyDynamicFormFieldOutletContext): void {
        if (!this.componentRef) {
            return;
        }
        const inputs = resolveDynamicFormFieldOutletContext(fieldType, context);
        for (const [key, value] of Object.entries(inputs)) {
            this.componentRef.setInput(key, value);
        }
        this.componentRef.changeDetectorRef.markForCheck();
    }
}
