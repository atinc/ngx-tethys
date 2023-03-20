import { Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

import { ThyFormDirective } from './form.directive';

/**
 * 表单提交指令
 * @name thyFormSubmit,[thy-form-submit]
 * @order 30
 */
@Directive({
    selector: '[thyFormSubmit],[thy-form-submit]',
    standalone: true
})
export class ThyFormSubmitDirective implements OnInit {
    /**
     * Form 验证通过的提交函数
     */
    @Output() thyFormSubmit = new EventEmitter();

    constructor(private thyFormDirective: ThyFormDirective) {}

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
