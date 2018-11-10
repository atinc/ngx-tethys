import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Injectable, Directive, Input, Optional, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ThyFormDirective } from '../form.directive';

@Directive({
  selector: '[thyUniqueCheck]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: ThyUniqueCheckValidator, multi: true
    }
  ]
})
export class ThyUniqueCheckValidator implements AsyncValidator {

  @Input() thyUniqueCheck: (value: any) => Observable<boolean>;

  constructor(
    private elementRef: ElementRef,
    @Optional() private thyForm: ThyFormDirective
  ) { }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.thyUniqueCheck(ctrl.value)
      .pipe(
        map((failed: boolean) => {
          setTimeout(() => {
            if (failed && this.thyForm && this.elementRef.nativeElement.name) {
              this.thyForm.validator.validateControl(this.elementRef.nativeElement.name);
            }
          });
          return failed ? { thyUniqueCheck: failed } : null;
        }),
        catchError(() => null)
      );
  }
}
