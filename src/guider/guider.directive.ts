import { ThyGuiderManager } from './guider-manager';
import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, NgZone, inject, input, afterNextRender } from '@angular/core';
import { take } from 'rxjs/operators';

/**
 * 标记新手引导的步骤的target，使用指令方式的新手引导支持多路由跳转
 * @name thyGuiderTarget
 * @order 40
 */
@Directive({
    selector: '[thyGuiderTarget]',
    exportAs: 'thyGuiderTarget'
})
export class ThyGuiderTargetDirective implements OnInit, OnDestroy, AfterViewInit {
    private guiderManager = inject(ThyGuiderManager);
    private el = inject(ElementRef);
    private ngZone = inject(NgZone);

    /**
     * 标记当前元素对应的新手引导中 step 的 key
     */
    readonly target = input.required<string>({ alias: 'thyGuiderTarget' });

    constructor() {
        afterNextRender(() => {
            const { key, guiderRef } = this.guiderManager.getActive();
            if (key === this.target()) {
                const index = guiderRef.steps.findIndex(step => step.key === this.target());
                this.ngZone.run(() => {
                    guiderRef.active(index);
                });
            }
        });
    }
    ngOnInit() {
        this.guiderManager.addStepTarget(this.target(), this.el.nativeElement);
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        const { guiderRef } = this.guiderManager.getActive();
        if (guiderRef) {
            guiderRef.close();
        }
        this.guiderManager.removeStepTarget(this.target());
    }
}
