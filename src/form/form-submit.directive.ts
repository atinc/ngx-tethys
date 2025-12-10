import { Directive, EventEmitter, HostListener, OnInit, Output, inject, output } from '@angular/core';

import { ThyFormDirective } from './form.directive';

/**
 * 表单提交指令
 * @name thyFormSubmit,[thy-form-submit]
 * @order 15
 */
@Directive({
    selector: '[thyFormSubmit],[thy-form-submit]'
})
export class ThyFormSubmitDirective implements OnInit {
    private thyFormDirective = inject(ThyFormDirective);

    /**
     * Form 验证通过的提交函数
     */
    readonly thyFormSubmit = output<Event>();

    ngOnInit(): void {
        this.thyFormDirective.onSubmitSuccess = ($event: Event) => {
            this.thyFormSubmit.emit($event);
        };
    }

    @HostListener('click', ['$event'])
    onSubmit($event: Event) {
        this.thyFormDirective.submit($event);
    }
}
