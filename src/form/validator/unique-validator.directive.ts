import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Directive, Input, Optional, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ThyFormDirective } from '../form.directive';

/**
 * 用于校验表单控件的输入值是否已经存在
 * @name thyUniqueCheck
 * @order 20
 */
@Directive({
    selector: '[thyUniqueCheck]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: ThyUniqueCheckValidator,
            multi: true
        }
    ],
    standalone: true
})
export class ThyUniqueCheckValidator implements AsyncValidator {
    @Input() thyUniqueCheck: (value: any) => Observable<boolean>;

    constructor(
        private elementRef: ElementRef,
        @Optional() private thyForm: ThyFormDirective
    ) {}

    validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.thyUniqueCheck(ctrl.value).pipe(
            map((failed: boolean) => {
                setTimeout(() => {
                    if (failed && this.thyForm && this.elementRef.nativeElement.name) {
                        this.thyForm.validator.validateControl(this.elementRef.nativeElement.name);
                    }
                });
                return failed ? { thyUniqueCheck: failed } : null;
            }),
            catchError(() => of(null))
        );
    }
}
